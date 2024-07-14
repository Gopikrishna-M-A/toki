import { NextResponse } from 'next/server';

export default async function middleware(req) {
  const path = req.nextUrl.pathname;
  const session = !!req.cookies.get("next-auth.session-token")

  if (!session) {
    return NextResponse.redirect(new URL(`/api/auth/signin?callbackUrl=${path}`, req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    // '/((?!api|_next/static|_next/image|favicon.ico).*)(.+)',
    '/dashboard/:path*'
  ]
}