import { NextResponse, type NextRequest } from 'next/server';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|viewBio).*)'],
};

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token'); // Obter o token dos cookies
  const { pathname } = request.nextUrl;

  // Páginas pública
  const publicRoutes = ['/', '/login', '/register', '/privacy-policy', '/terms-of-use', '/status'];

  // Normalizar a URL para minúsculas
  const normalizedPathname = pathname.toLowerCase();

  // Redirecionar apenas se a URL original contiver letras maiúsculas
  if (pathname !== normalizedPathname) {
    return NextResponse.redirect(new URL(normalizedPathname, request.url));
  }

  if(token && pathname === "/"){
    return NextResponse.redirect(new URL('/home', request.url))
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



// // middleware.ts
// import { NextResponse, type NextRequest } from 'next/server';

// export const config = {
//   matcher: [
//     '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)',
//   ],
// };

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get('access_token')?.value;
//   const { pathname } = request.nextUrl;

//   // 1. Early return para arquivos estáticos
//   if (
//     pathname.startsWith('/_next/') || 
//     pathname.startsWith('/api/') ||
//     pathname.startsWith('/static/') ||
//     /\.(\w+)$/.test(pathname)
//   ) {
//     return NextResponse.next();
//   }

//   // 2. Normalização de URL (case-insensitive)
//   const normalizedPath = pathname.toLowerCase();
//   if (pathname !== normalizedPath) {
//     const newUrl = new URL(normalizedPath, request.url);
//     return NextResponse.redirect(newUrl);
//   }

//   // 3. Definição de rotas públicas
//   const publicRoutes = [
//     '/',
//     '/login', 
//     '/register',
//     '/privacy-policy',
//     '/terms-of-use',
//     '/status',
//     // Padrão para rotas de perfil público (ex: /@username ou /username)
//     /^(\/(@)?[a-z0-9_-]+)$/i
//   ];

//   const isPublicRoute = publicRoutes.some(route => 
//     typeof route === 'string' ? route === pathname : route.test(pathname)
//   );

//   // 4. Redirecionamentos especiais
//   if (token && pathname === '/') {
//     return NextResponse.redirect(new URL('/home', request.url));
//   }

//   // 5. Rewrite para rotas de perfil (opcional)
//   if (/^\/@[a-z0-9_-]+$/i.test(pathname)) {
//     const username = pathname.slice(2);
//     return NextResponse.rewrite(new URL(`/${username}`, request.url));
//   }

//   // 6. Proteção de rotas privadas
//   if (!token && !isPublicRoute) {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   return NextResponse.next();
// }