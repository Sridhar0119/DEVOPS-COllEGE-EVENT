import { NextRequest, NextResponse } from "next/server";
import { getAllUsers } from "@/src/lib/appwrite-server";

// Simple token-based auth for admin endpoints
// In production, use proper authentication
const ADMIN_TOKEN = process.env.ADMIN_API_TOKEN;

// CORS headers for admin panel
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(request: NextRequest) {
  // Check for admin authorization
  const authHeader = request.headers.get("Authorization");
  const token = authHeader?.replace("Bearer ", "");

  // If ADMIN_TOKEN is set, require it; otherwise allow (for development)
  if (ADMIN_TOKEN && token !== ADMIN_TOKEN) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401, headers: corsHeaders }
    );
  }

  try {
    // Use server-side Appwrite SDK to fetch all users
    const users = await getAllUsers();
    return NextResponse.json({ users, total: users.length }, { headers: corsHeaders });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500, headers: corsHeaders }
    );
  }
}
