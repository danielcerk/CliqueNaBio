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

   // Ignorar arquivos estáticos
   if (
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.match(/\.(png|jpg|jpeg|gif|svg|webp|ico|css|js|woff2?)$/)
  ) {
    return NextResponse.next();
  }

  if (/^\/@[^\/]+$/.test(pathname)) {
    const username = pathname.slice(2); // Remove '/@'
    return NextResponse.rewrite(new URL(`/${username}`, request.url));
  }


  // Proteger rotas privadas
  if (!token && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

