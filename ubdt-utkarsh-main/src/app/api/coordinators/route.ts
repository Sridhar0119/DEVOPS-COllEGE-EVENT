import { NextRequest, NextResponse } from "next/server";
import { getCoordinatorsByLabel } from "@/src/lib/appwrite-server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const eventId = searchParams.get("eventId");

  if (!eventId) {
    return NextResponse.json(
      { error: "Event ID is required" },
      { status: 400 }
    );
  }

  try {
    // Use server-side Appwrite SDK to fetch coordinators
    const coordinators = await getCoordinatorsByLabel(eventId);
    return NextResponse.json({ coordinators });
  } catch (error) {
    console.error("Error fetching coordinators:", error);
    return NextResponse.json(
      { error: "Failed to fetch coordinators" },
      { status: 500 }
    );
  }
}
