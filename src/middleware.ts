import { NextResponse, type NextRequest } from 'next/server';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|viewBio).*)'],
};

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

// middleware.ts
// import { NextResponse, type NextRequest } from 'next/server'

// export const config = {
//   matcher: [
//     '/((?!api|_next/static|_next/image|favicon.ico).*)',
//   ]
// }

// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl
//   const token = request.cookies.get('access_token')

//   // Debug obrigatório
//   console.log(`[Middleware] Path: ${pathname}`)

//   // 1. Caso especial para rota raiz
//   if (pathname === '/') {
//     if (token) {
//       return NextResponse.redirect(new URL('/home', request.url))
//     }
//     return NextResponse.next()
//   }

//   // 2. Tratamento de perfis (rota dinâmica)
//   if (/^\/@?[a-zA-Z0-9_-]+$/.test(pathname)) {
//     const username = pathname.replace(/^\/@?/, '')
//     const newUrl = new URL(`/${username}`, request.url)
    
//     console.log(`[Profile] Rewriting: ${pathname} → ${newUrl.pathname}`)
//     return NextResponse.rewrite(newUrl)
//   }

//   // 3. Rotas públicas
//   const publicRoutes = ['/login', '/register', '/privacy-policy', '/terms-of-use', '/status']
//   if (publicRoutes.includes(pathname)) {
//     return NextResponse.next()
//   }

//   // 4. Proteção de rotas privadas
//   if (!token) {
//     console.log(`[Auth] Redirecting to login: ${pathname}`)
//     return NextResponse.redirect(new URL('/login', request.url))
//   }

//   return NextResponse.next()
// }