import { Client, Databases, Storage, ID, Query } from "appwrite";

const client = new Client();

const appwriteEndpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const appwriteProjectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

if (!appwriteEndpoint) {
  throw new Error("NEXT_PUBLIC_APPWRITE_ENDPOINT is not defined.");
}
if (!appwriteProjectId) {
  throw new Error("NEXT_PUBLIC_APPWRITE_PROJECT_ID is not defined.");
}

client
  .setEndpoint(appwriteEndpoint)
  .setProject(appwriteProjectId);

export const databases = new Databases(client);
export const storage = new Storage(client);

// Database for participant registrations (ubdt-events-db)
export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;

// Database for event metadata (events-list)
export const EVENTS_DATABASE_ID = process.env.NEXT_PUBLIC_EVENTS_DATABASE_ID!;
export const EVENTS_COLLECTION_ID = process.env.NEXT_PUBLIC_EVENTS_COLLECTION_ID!;

// Storage bucket for payment screenshots
export const STORAGE_BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID!;

// Storage bucket for event assets (thumbnails, brochures)
export const EVENTS_STORAGE_BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_EVENTS_STORAGE_BUCKET_ID!;

// Get file preview/download URL
export function getFilePreviewUrl(bucketId: string, fileId: string): string {
  return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${bucketId}/files/${fileId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;
}

export function getFileDownloadUrl(bucketId: string, fileId: string): string {
  return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${bucketId}/files/${fileId}/download?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;
}

export { ID, Query };
