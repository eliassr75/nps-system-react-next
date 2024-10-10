import { NextResponse } from 'next/server';

export async function middleware(req) {
    const token = req.cookies.get('token')?.value; // Coletando o token do cookie
    const url = req.nextUrl.clone(); // Clona a URL da requisição

    // Verifica se o token existe
    if (!token) {
        url.pathname = '/login'; // Redireciona para a página de login se não estiver autenticado
        return NextResponse.redirect(url);
    }

    // Prossegue para a página protegida
    return NextResponse.next(); 
}

export const config = {
    matcher: ['/admin/:path*'], // Define as rotas que serão protegidas pelo middleware
};
