import { databases, storage, DATABASE_ID, STORAGE_BUCKET_ID, ID } from "../appwrite";

// Upload payment screenshot
export async function uploadPaymentScreenshot(file: File): Promise<string> {
  try {
    const response = await storage.createFile(
      STORAGE_BUCKET_ID,
      ID.unique(),
      file
    );

    // Get the file URL - getFileView returns a string URL in Appwrite SDK
    const fileUrl = storage.getFileView(STORAGE_BUCKET_ID, response.$id);
    return fileUrl;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}

// Generate unique team ID
function generateTeamId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `UTKARSH-${timestamp}-${random}`;
}

interface RegistrationData {
  Name: string;
  Email: string;
  Phone_Number: string;
  USN: string;
  College_Name: string;
  Other_Team_Members_Name?: string[];
  Other_Team_Members_USN?: string[];
  Transaction_ID: string;
  Payment_Screenshot_Link: string;
}

// Register for an event
export async function registerForEvent(
  collectionId: string,
  data: RegistrationData
): Promise<{ success: boolean; message: string; teamId?: string }> {
  try {
    const teamId = generateTeamId();

    await databases.createDocument(
      DATABASE_ID,
      collectionId,
      ID.unique(),
      {
        ...data,
        Unique_Team_ID: teamId,
        Attended: false,
        Verified: false,
      }
    );

    return { success: true, message: "Registration successful!", teamId };
  } catch (error: unknown) {
    console.error("Error registering:", error);
    const errorMessage = error instanceof Error ? error.message : "Registration failed. Please try again.";
    return { success: false, message: errorMessage };
  }
}
