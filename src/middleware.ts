import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token'); // Obter o token dos cookies
  const { pathname } = request.nextUrl;

  // Páginas públicas
  const publicRoutes = ['/', '/login', '/register', '/privacy-policy', '/terms-of-use', '/status', '/viewBio'];

  // Normalizar a URL para minúsculas
  const normalizedPathname = pathname.toLowerCase();

  // Redirecionar apenas se a URL original contiver letras maiúsculas
  if (pathname !== normalizedPathname) {
    return NextResponse.redirect(new URL(normalizedPathname, request.url));
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