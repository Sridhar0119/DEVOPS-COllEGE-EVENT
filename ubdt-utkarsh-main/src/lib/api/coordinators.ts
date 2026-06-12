import type { Coordinator } from "@/src/types/event";

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;

// Fetch coordinators (users with labels matching the event collectionId)
// We use fetch API since we need to access users endpoint
export async function getCoordinatorsByEventLabel(eventCollectionId: string): Promise<Coordinator[]> {
  try {
    // Note: This requires server-side API key access
    // For client-side, we'll create an API route
    const response = await fetch(`/api/coordinators?eventId=${eventCollectionId}`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch coordinators");
    }
    
    const data = await response.json();
    return data.coordinators || [];
  } catch (error) {
    console.error("Error fetching coordinators:", error);
    return [];
  }
}
