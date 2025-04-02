import database from '@/lib/mongodb';
import User from '@/models/user.model';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      await database.connect();

      const user = await User.findOne({ username });

      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      // Verifica se a senha corresponde
      if (user.password !== password) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }

      res.status(200).json({
        message: 'Login bem-sucedido!',
        user: user,  // Retorna todos os dados do usuário, incluindo ID, status e outros campos
      });

      await database.disconnect();
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Erro ao autenticar o usuário:', err.message);
        res.status(500).json({ message: 'Erro ao autenticar o usuário', error: err.message });
      } else {
        console.error('Erro desconhecido:', err);
        res.status(500).json({ message: 'Erro desconhecido' });
      }
    }
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}
