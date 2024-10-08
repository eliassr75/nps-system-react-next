import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const responses = await prisma.npsResponse.findMany();
      return res.status(200).json(responses);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao buscar as avaliações' });
    }
  } else {
    return res.status(405).json({ message: 'Método não permitido' });
  }
}
