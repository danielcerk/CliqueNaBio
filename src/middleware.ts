

import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token'); // Obter o token dos cookies

  // Páginas públicas
  const publicRoutes = ['/', '/User/Login', '/User/Register', '/Terms/PrivacyPolicy', '/Terms/TermsOfUse', '/Status'];

  const { pathname } = request.nextUrl;

  // Se não estiver autenticado e tentando acessar uma página não pública, redireciona para '/'
  if (!token && !publicRoutes.includes(pathname) && !pathname.startsWith('/_next')) {
    return NextResponse.redirect(new URL('/', request.url)); // Redireciona para a página '/'
  }

  return NextResponse.next();
}

