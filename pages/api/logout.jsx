export default async function logoutHandler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método não permitido' });
    }

    // Define o cookie `token` com Max-Age=0 para expirar
    res.setHeader('Set-Cookie', 'token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict;');
    
    return res.status(200).json({ message: 'Logout bem-sucedido' });
}