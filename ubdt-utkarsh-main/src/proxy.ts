import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function runs on every request
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Allow static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  try {
    // Fetch maintenance mode status from Appwrite
    const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
    const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
    const databaseId = process.env.NEXT_PUBLIC_EVENTS_DATABASE_ID;
    
    // 1. Check if variables exist
    if (!endpoint || !projectId || !databaseId) {
      console.error("Proxy: Missing required Appwrite environment variables.");
      return NextResponse.next();
    }

    // 2. Ensure endpoint has /v1 (Common issue with Appwrite Cloud)
    // If endpoint is "https://cloud.appwrite.io", append "/v1"
    const baseUrl = endpoint.endsWith('/v1') ? endpoint : `${endpoint}/v1`;
    
    const response = await fetch(
      `${baseUrl}/databases/${databaseId}/collections/app-settings/documents/main-settings`,
      {
        headers: {
          'X-Appwrite-Project': projectId,
          'Content-Type': 'application/json',
        },
        cache: 'no-store', // Explicitly request no cache
        next: { revalidate: 0 }
      }
    );

    if (response.ok) {
      const data = await response.json();
      const isMaintenanceMode = data.maintenanceMode === true;
      
      // If maintenance is OFF and on coming-soon page, redirect to home
      if (!isMaintenanceMode && pathname.startsWith('/coming-soon')) {
        const homeUrl = new URL('/', request.url);
        return NextResponse.redirect(homeUrl);
      }
      
      // If maintenance mode is ON and NOT on coming-soon, redirect to coming-soon
      if (isMaintenanceMode && !pathname.startsWith('/coming-soon')) {
        const comingSoonUrl = new URL('/coming-soon', request.url);
        return NextResponse.redirect(comingSoonUrl);
      }
    } else {
      console.error(`Proxy: Failed to fetch settings. Status: ${response.status}. Ensure 'main-settings' document has Read permissions for 'role:all'.`);
    }
  } catch (error) {
    console.error('Proxy: Error checking maintenance mode:', error);
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
}