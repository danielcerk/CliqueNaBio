
import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token'); // Obter o token dos cookies

  // Páginas públicas
  const publicRoutes = ['/', '/login', '/register', '/privacyPolicy', '/termsOfUse', '/status', '/viewBio'];

  const { pathname } = request.nextUrl;

  // **Permitir acesso a arquivos estáticos**
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/public') ||
    pathname.match(/\.(png|jpg|jpeg|gif|svg|webp|ico|css|js|woff2?)$/)
  ) {
    return NextResponse.next();
  }

  // Verificar se a rota é dinâmica (ex: /profile/slug)
  const isDynamicRoute = /^\/profile\/[^\/]+$/.test(pathname); // Verifica se a rota começa com /profile/ e tem um slug

  // Se for uma rota dinâmica, permitir o acesso
  if (isDynamicRoute) {
    const slug = pathname.split('/')[2]; // Extrai o slug da URL (ex: /profile/joao123 -> joao123)

    // Aqui você pode adicionar uma lógica para validar o slug
    // Exemplo: Verificar se o slug existe no banco de dados
    // if (!isValidSlug(slug)) {
    //   return NextResponse.redirect(new URL('/not-found', request.url));
    // }

    return NextResponse.next();
  }

  // Se não estiver autenticado e tentando acessar uma página não pública, redireciona para '/'
  if (!token && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}