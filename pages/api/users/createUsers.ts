import jwt from 'jsonwebtoken';
import database from '@/lib/mongodb';
import User from '@/models/user.model';
import { NextApiRequest, NextApiResponse } from 'next';

const SECRET_KEY = process.env.JWT_SECRET || 'LuizHenrique_EricaSousa_31-05-2025!';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password, email } = req.body;

    try {
      await database.connect();

      const novoUsuario = new User({
        username,
        password,
        email,
        role: 'user',
        status: 'active',
        paymentStatus: 'unpaid',
        paymentDate: null,
      });

      const resultado = await novoUsuario.save();

      // Criar token JWT
      const token = jwt.sign(
        { id: resultado._id, username: resultado.username, email: resultado.email, role: resultado.role },
        SECRET_KEY,
      );

      res.status(201).json({
        message: 'Usuário criado com sucesso!',
        user: resultado,
        token,
      });

      await database.disconnect();
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Erro ao criar o Usuário:', err.message);
        res.status(500).json({ message: 'Erro ao criar o Usuário', error: err.message });
      } else {
        console.error('Erro desconhecido:', err);
        res.status(500).json({ message: 'Erro desconhecido' });
      }
    }
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}
