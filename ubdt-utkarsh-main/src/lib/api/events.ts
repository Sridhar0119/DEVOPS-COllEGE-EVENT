import { databases, EVENTS_DATABASE_ID, EVENTS_COLLECTION_ID, Query } from "../appwrite";
import type { Event, EventCollection } from "@/src/types/event";

// Fetch all events from events-list database
export async function getAllEvents(): Promise<Event[]> {
  try {
    const response = await databases.listDocuments(
      EVENTS_DATABASE_ID,
      EVENTS_COLLECTION_ID
    );
    return response.documents as unknown as Event[];
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}

// Fetch single event by eventId (slug)
export async function getEventBySlug(slug: string): Promise<Event | null> {
  try {
    const response = await databases.listDocuments(
      EVENTS_DATABASE_ID,
      EVENTS_COLLECTION_ID,
      [Query.equal("eventId", slug)]
    );
    return (response.documents[0] as unknown as Event) || null;
  } catch (error) {
    console.error("Error fetching event:", error);
    return null;
  }
}

// Fetch event by collection ID
export async function getEventByCollectionId(collectionId: string): Promise<Event | null> {
  try {
    const response = await databases.listDocuments(
      EVENTS_DATABASE_ID,
      EVENTS_COLLECTION_ID,
      [Query.equal("collectionId", collectionId)]
    );
    return (response.documents[0] as unknown as Event) || null;
  } catch (error) {
    console.error("Error fetching event:", error);
    return null;
  }
}

// Get all event collections for dropdown
export async function getEventCollections(): Promise<EventCollection[]> {
  try {
    const response = await databases.listDocuments(
      EVENTS_DATABASE_ID,
      EVENTS_COLLECTION_ID
    );
    return response.documents
      .filter((doc) => doc.registrationEnabled !== false) // Filter out disabled events
      .map((doc) => ({
        id: doc.collectionId as string,
        eventId: doc.eventId as string,
        name: doc.name as string,
        maxParticipants: doc.maxParticipants as number,
        price: doc.price as number,
        upiId: doc.upiId as string,
        spotRegistration: doc.spotRegistration as boolean | undefined,
        registrationEnabled: doc.registrationEnabled as boolean | undefined,
      }));
  } catch (error) {
    console.error("Error fetching event collections:", error);
    return [];
  }
}