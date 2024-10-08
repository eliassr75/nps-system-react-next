import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { score, name, phone, feedback } = req.body;

    try {
      await prisma.npsResponse.create({
        data: {
          score: parseInt(score),
          name,
          phone,
          feedback,
        },
      });
      return res.status(200).json({ message: 'Avaliação recebida!' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao salvar a avaliação' });
    }
  } else {
    return res.status(405).json({ message: 'Método não permitido' });
  }
}
