import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token'); // Obter o token dos cookies
  const { pathname } = request.nextUrl;

  // Páginas públicas
  const publicRoutes = ['/', '/login', '/register', '/privacyPolicy', '/termsOfUse', '/status', '/viewBio'];

  // Verifica se a URL contém letras maiúsculas e redireciona para minúsculas
  if (pathname !== pathname.toLowerCase()) {
    return NextResponse.redirect(new URL(pathname.toLowerCase(), request.url));
  }

  // Ignorar arquivos estáticos e rotas do Next.js
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/public') ||
    pathname.match(/\.(png|jpg|jpeg|gif|svg|webp|ico|css|js|woff2?)$/)
  ) {
    return NextResponse.next();
  }

  // Verificar rotas dinâmicas (ex: /profile/[slug])
  const isDynamicRoute = /^\/profile\/[^\/]+$/.test(pathname);

  if (isDynamicRoute) {
    const slug = pathname.split('/')[2];
    // Aqui você pode adicionar lógica adicional para rotas dinâmicas, se necessário
    return NextResponse.next();
  }

  // Proteger rotas privadas
  if (!token && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}