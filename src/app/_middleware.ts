import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAuth } from 'firebase/auth';

export function middleware(req: NextRequest) {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    // Redirect to login page if not authenticated
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Allow access if user is authenticated
  return NextResponse.next();
}
