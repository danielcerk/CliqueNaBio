
import type { NextApiRequest, NextApiResponse } from 'next';

interface LoginRequest {
  email: string;
  password: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password }: LoginRequest = req.body;

    if (email === 'admin@example.com' && password === '123456') {
      return res.status(200).json({ message: 'Autenticação bem-sucedida!' });
    } else {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }
  } else {
    return res.status(405).json({ message: 'Método não permitido' });
  }
}
