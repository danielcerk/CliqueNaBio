import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token'); // Obter o token dos cookies

  // Páginas públicas
  const publicRoutes = ['/', '/User/Login', '/User/Register', '/terms/privacyPolicy', '/terms/termsOfUse', '/status'];

  const { pathname } = request.nextUrl;

  // **Permitir acesso a arquivos estáticos**
  if (pathname.startsWith('/_next') || pathname.startsWith('/public') || pathname.match(/\.(png|jpg|jpeg|gif|svg|webp|ico|css|js|woff2?)$/)) {
    return NextResponse.next();
  }

  // Se não estiver autenticado e tentando acessar uma página não pública, redireciona para '/'
  if (!token && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}
