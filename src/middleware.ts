// import { NextResponse, type NextRequest } from 'next/server';

// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|favicon.ico|viewBio).*)'],
// };

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get('access_token'); // Obter o token dos cookies
//   const { pathname } = request.nextUrl;

//   // Páginas pública
//   const publicRoutes = ['/', '/login', '/register', '/privacy-policy', '/terms-of-use', '/status'];

//   // Normalizar a URL para minúsculas
//   const normalizedPathname = pathname.toLowerCase();

//   // Redirecionar apenas se a URL original contiver letras maiúsculas
//   if (pathname !== normalizedPathname) {
//     return NextResponse.redirect(new URL(normalizedPathname, request.url));
//   }

//   if(token && pathname === "/"){
//     return NextResponse.redirect(new URL('/home', request.url))
//   }

//    // Ignorar arquivos estáticos
//    if (
//     pathname.startsWith('/_next') || 
//     pathname.startsWith('/api') ||
//     pathname.startsWith('/static') ||
//     pathname.match(/\.(png|jpg|jpeg|gif|svg|webp|ico|css|js|woff2?)$/)
//   ) {
//     return NextResponse.next();
//   }

//   if (/^\/@[^\/]+$/.test(pathname)) {
//     const username = pathname.slice(2); // Remove '/@'
//     return NextResponse.rewrite(new URL(`/${username}`, request.url));
//   }


//   // Proteger rotas privadas
//   if (!token && !publicRoutes.includes(pathname)) {
//     return NextResponse.redirect(new URL('/', request.url));
//   }

//   return NextResponse.next();
// }



import { NextResponse, type NextRequest } from 'next/server';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|viewBio).*)'],
};

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token');
  const { pathname } = request.nextUrl;

  // Lista de todas as rotas existentes no seu app (exceto perfis)
  const appRoutes = [
    '/',
    '/login',
    '/register',
    '/home',
    '/view',
    '/create',
    '/signature',
    '/privacy-policy',
    '/terms-of-use',
    '/status',
    '/account',
    '/edit-account',
    '/profile', 
  ];

  // Páginas públicas (subconjunto de appRoutes)
  const publicRoutes = [
    '/', 
    '/login', 
    '/register', 
    '/privacy-policy', 
    '/terms-of-use', 
    '/status',
    '/profile' // se /profile for pública
  ];

  // Normalizar URL para minúsculas
  const normalizedPathname = pathname.toLowerCase();
  if (pathname !== normalizedPathname) {
    return NextResponse.redirect(new URL(normalizedPathname, request.url));
  }

  // Redirecionar para /home se estiver logado e na raiz
  if (token && pathname === "/") {
    return NextResponse.redirect(new URL('/home', request.url));
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

  // Verificar se é uma rota conhecida do app
  const isAppRoute = appRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );

  // Se for uma rota de perfil (começa com /profile/)
  if (pathname.startsWith('/profile/')) {
    const username = pathname.split('/profile/')[1];
    if (!username || username.includes('/')) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // Se não for uma rota conhecida do app, tratar como possível perfil
  if (!isAppRoute) {
    // Verificar se o path corresponde a um formato de perfil (/username ou /@username)
    const profileMatch = pathname.match(/^\/(@?)([a-zA-Z0-9_-]+)$/);
    if (profileMatch) {
      const username = profileMatch[2];
      // Redirecionar explicitamente para /profile/username
      return NextResponse.redirect(new URL(`/profile/${username}`, request.url));
    }
    
    // Se não for uma rota do app nem um perfil válido, redirecionar
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Proteger rotas privadas (não públicas e não são perfis)
  if (!token && !publicRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  )) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}