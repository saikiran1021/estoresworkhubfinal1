import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { SessionPayload } from '@/lib/definitions';

const protectedRoutes = ['/admin', '/employee', '/college', '/industry', '/dashboard'];
const authRoutes = ['/login', '/signup'];

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('session');
  const { pathname } = request.nextUrl;

  let session: SessionPayload | null = null;
  if (sessionCookie) {
    try {
      session = JSON.parse(sessionCookie.value);
    } catch (error) {
      console.error('Invalid session cookie:', error);
    }
  }

  const isAuthRoute = authRoutes.includes(pathname);
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  // If user is logged in
  if (session) {
    // and trying to access login/signup, redirect to their dashboard
    if (isAuthRoute) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // and trying to access a protected route for another role, redirect to their own dashboard
    const userRole = session.role.toLowerCase();
    if (isProtectedRoute && !pathname.startsWith(`/${userRole}`) && pathname !== '/dashboard') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  } 
  // If user is not logged in
  else {
    // and trying to access a protected route, redirect to login
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
