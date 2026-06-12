/**
 * Server-only Appwrite client with API key for admin operations.
 * This file should only be imported in server components and API routes.
 */
import { Client, Users, Query } from "node-appwrite";

// Validate environment variables
const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const apiKey = process.env.APPWRITE_API_KEY;

if (!endpoint) {
  throw new Error("NEXT_PUBLIC_APPWRITE_ENDPOINT is not defined");
}
if (!projectId) {
  throw new Error("NEXT_PUBLIC_APPWRITE_PROJECT_ID is not defined");
}

// Create server client with API key
function createServerClient() {
  const client = new Client()
    .setEndpoint(endpoint!)
    .setProject(projectId!);
  
  if (apiKey) {
    client.setKey(apiKey);
  }
  
  return client;
}

const serverClient = createServerClient();
const users = new Users(serverClient);

/**
 * Fetch all users from Appwrite with pagination.
 * Returns all users in one array.
 */
export async function getAllUsers() {
  const allUsers: Array<{
    $id: string;
    name: string;
    email: string;
    phone: string;
    labels: string[];
    status: boolean;
    $createdAt: string;
  }> = [];
  
  const batchSize = 100;
  let offset = 0;
  let hasMore = true;

  while (hasMore) {
    const response = await users.list(
      [Query.limit(batchSize), Query.offset(offset)]
    );
    
    const fetchedUsers = response.users || [];
    
    for (const user of fetchedUsers) {
      allUsers.push({
        $id: user.$id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        labels: user.labels || [],
        status: user.status,
        $createdAt: user.$createdAt,
      });
    }

    if (fetchedUsers.length < batchSize) {
      hasMore = false;
    } else {
      offset += batchSize;
    }
  }

  return allUsers;
}

/**
 * Fetch coordinators for a specific event by label.
 * Returns name and phone for public display.
 */
export async function getCoordinatorsByLabel(eventLabel: string) {
  const allUsers = await getAllUsers();
  
  return allUsers
    .filter((user) => user.labels.includes(eventLabel))
    .map((user) => ({
      $id: user.$id,
      name: user.name,
      phone: user.phone,
    }));
}

export { users, Query };
