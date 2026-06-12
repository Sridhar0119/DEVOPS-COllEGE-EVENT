/**
 * Backend API Server for UBDT Utkarsh
 * Provides REST endpoints for events, registration, coordinators
 * Connects to Appwrite as the database
 */

const express = require("express");
const cors = require("cors");
const { Client, Databases, Users, Storage, ID, Query } = require("node-appwrite");

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.ALLOWED_ORIGINS || "*" }));

// ─── Appwrite Client Setup ────────────────────────────────────────────────────
const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);
const users    = new Users(client);
const storage  = new Storage(client);

// ─── ENV Constants ────────────────────────────────────────────────────────────
const {
  EVENTS_DATABASE_ID,
  EVENTS_COLLECTION_ID,
  DATABASE_ID,           // participant registrations DB
  STORAGE_BUCKET_ID,     // payment screenshots bucket
  EVENTS_STORAGE_BUCKET_ID,
  ADMIN_API_TOKEN,
} = process.env;

// ─── Auth Middleware ──────────────────────────────────────────────────────────
function adminAuth(req, res, next) {
  if (!ADMIN_API_TOKEN) return next(); // skip in dev if token not set
  const token = (req.headers.authorization || "").replace("Bearer ", "");
  if (token !== ADMIN_API_TOKEN) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get("/health", (_req, res) => res.json({ status: "ok", timestamp: new Date() }));

// ─── GET /api/events  ─────────────────────────────────────────────────────────
// Returns all events sorted by eventId ascending
app.get("/api/events", async (_req, res) => {
  try {
    const response = await databases.listDocuments(
      EVENTS_DATABASE_ID,
      EVENTS_COLLECTION_ID,
      [Query.limit(100), Query.orderAsc("eventId")]
    );
    res.json({ events: response.documents, total: response.total });
  } catch (err) {
    console.error("GET /api/events error:", err);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

// ─── GET /api/events/:slug  ───────────────────────────────────────────────────
// Fetch a single event by its eventId slug
app.get("/api/events/:slug", async (req, res) => {
  const { slug } = req.params;
  try {
    const response = await databases.listDocuments(
      EVENTS_DATABASE_ID,
      EVENTS_COLLECTION_ID,
      [Query.equal("eventId", slug)]
    );
    if (!response.documents.length) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.json(response.documents[0]);
  } catch (err) {
    console.error("GET /api/events/:slug error:", err);
    res.status(500).json({ error: "Failed to fetch event" });
  }
});

// ─── GET /api/events/collection/:collectionId  ────────────────────────────────
// Fetch event by its Appwrite collectionId (used for registration dropdown)
app.get("/api/events/collection/:collectionId", async (req, res) => {
  const { collectionId } = req.params;
  try {
    const response = await databases.listDocuments(
      EVENTS_DATABASE_ID,
      EVENTS_COLLECTION_ID,
      [Query.equal("collectionId", collectionId)]
    );
    if (!response.documents.length) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.json(response.documents[0]);
  } catch (err) {
    console.error("GET /api/events/collection/:id error:", err);
    res.status(500).json({ error: "Failed to fetch event" });
  }
});

// ─── GET /api/event-collections  ─────────────────────────────────────────────
// Returns lightweight list for the registration page dropdown
app.get("/api/event-collections", async (_req, res) => {
  try {
    const response = await databases.listDocuments(
      EVENTS_DATABASE_ID,
      EVENTS_COLLECTION_ID,
      [Query.limit(100)]
    );
    const collections = response.documents
      .filter((doc) => doc.registrationEnabled !== false)
      .map((doc) => ({
        id: doc.collectionId,
        eventId: doc.eventId,
        name: doc.name,
        maxParticipants: doc.maxParticipants,
        price: doc.price,
        upiId: doc.upiId,
        spotRegistration: doc.spotRegistration,
        registrationEnabled: doc.registrationEnabled,
      }));
    res.json({ collections });
  } catch (err) {
    console.error("GET /api/event-collections error:", err);
    res.status(500).json({ error: "Failed to fetch event collections" });
  }
});

// ─── POST /api/register  ──────────────────────────────────────────────────────
// Register a participant for an event
app.post("/api/register", async (req, res) => {
  const {
    collectionId,
    Name, Email, Phone_Number, USN, College_Name,
    Other_Team_Members_Name, Other_Team_Members_USN,
    Transaction_ID, Payment_Screenshot_Link,
  } = req.body;

  if (!collectionId || !Name || !Email || !Phone_Number || !USN || !Transaction_ID) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random    = Math.random().toString(36).substring(2, 8).toUpperCase();
    const teamId    = `UTKARSH-${timestamp}-${random}`;

    await databases.createDocument(
      DATABASE_ID,
      collectionId,
      ID.unique(),
      {
        Name, Email, Phone_Number, USN, College_Name,
        Other_Team_Members_Name: Other_Team_Members_Name || [],
        Other_Team_Members_USN:  Other_Team_Members_USN  || [],
        Transaction_ID,
        Payment_Screenshot_Link,
        Unique_Team_ID: teamId,
        Attended:  false,
        Verified:  false,
      }
    );

    res.json({ success: true, message: "Registration successful!", teamId });
  } catch (err) {
    console.error("POST /api/register error:", err);
    res.status(500).json({ success: false, message: err.message || "Registration failed" });
  }
});

// ─── GET /api/coordinators?eventId=xxx  ───────────────────────────────────────
// Returns coordinators for an event (users whose labels include the eventId)
app.get("/api/coordinators", async (req, res) => {
  const { eventId } = req.query;
  if (!eventId) return res.status(400).json({ error: "eventId is required" });

  try {
    const allUsersResp = await users.list([Query.limit(500)]);
    const coordinators = allUsersResp.users
      .filter((u) => (u.labels || []).includes(eventId))
      .map((u) => ({ $id: u.$id, name: u.name, phone: u.phone }));
    res.json({ coordinators });
  } catch (err) {
    console.error("GET /api/coordinators error:", err);
    res.status(500).json({ error: "Failed to fetch coordinators" });
  }
});

// ─── GET /api/admin/users  ────────────────────────────────────────────────────
// Admin endpoint — returns all registered Appwrite users
app.get("/api/admin/users", adminAuth, async (_req, res) => {
  try {
    const allUsers = [];
    let offset = 0;
    const batchSize = 100;

    while (true) {
      const resp = await users.list([Query.limit(batchSize), Query.offset(offset)]);
      allUsers.push(...resp.users.map((u) => ({
        $id: u.$id, name: u.name, email: u.email,
        phone: u.phone, labels: u.labels, status: u.status, $createdAt: u.$createdAt,
      })));
      if (resp.users.length < batchSize) break;
      offset += batchSize;
    }

    res.json({ users: allUsers, total: allUsers.length });
  } catch (err) {
    console.error("GET /api/admin/users error:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// ─── GET /api/storage/file  ───────────────────────────────────────────────────
// Proxy-builds a public file URL (view endpoint)
app.get("/api/storage/file", (req, res) => {
  const { bucketId, fileId } = req.query;
  if (!bucketId || !fileId) return res.status(400).json({ error: "bucketId and fileId required" });
  const url = `${process.env.APPWRITE_ENDPOINT}/storage/buckets/${bucketId}/files/${fileId}/view?project=${process.env.APPWRITE_PROJECT_ID}`;
  res.json({ url });
});

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend API running on port ${PORT}`));