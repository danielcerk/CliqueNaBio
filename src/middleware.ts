
import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token'); // Obter o token dos cookies

  // Páginas públicas
  const publicRoutes = ['/', '/login', '/register', '/privacyPolicy', '/termsOfUse', '/status', '/viewBio'];

  const { pathname } = request.nextUrl;

  if (

    pathname.startsWith('/_next') ||
    pathname.startsWith('/public') ||
    pathname.match(/\.(png|jpg|jpeg|gif|svg|webp|ico|css|js|woff2?)$/)

  ) {

    return NextResponse.next();

  }

  const isDynamicRoute = /^\/profile\/[^\/]+$/.test(pathname);

  if (isDynamicRoute) {

    const slug = pathname.split('/')[2];

    return NextResponse.next();
  }


  if (!token && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}