import { type NextRequest } from "next/server";

import { updateSession } from "@/features/auth";

export async function middleware(request: NextRequest) {
  // console.log("middleware");
  return await updateSession(request);
}

export const config = {
  runtime: 'experimental-edge',
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * - test - test path
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|test|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
