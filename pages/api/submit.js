import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { surveyId, entityId, score, name, phone, feedback } = req.body;

        // Validação simples dos dados (você pode usar uma biblioteca para isso)
        if (!surveyId || !entityId || !name || !phone || score === undefined) {
            return res.status(400).json({ message: "Dados inválidos" });
        }

        try {
            // Usando findMany para buscar clientes com base em múltiplos critérios
            let clients = await prisma.Client.findMany({
                where: { 
                    entityId: entityId,
                    name: {
                        contains: name, // Filtrando pelo nome
                    }
                },
            });
            
            let client;
            if (clients.length > 0) {
                client = clients[0]; // Pegando o primeiro cliente encontrado
            } else {
                // Se não existir, criar um novo cliente
                client = await prisma.Client.create({
                    data: {
                        name, 
                        phone,
                        entityId
                    },
                });
            }
        
            await prisma.npsResponse.create({
                data: {
                    surveyId,
                    entityId,
                    clientId: client.id,
                    score: parseInt(score, 10), // Especificando a base numérica
                    feedback,
                },
            });
            return res.status(200).json({ 
                message: "Avaliação recebida!", 
                clientId: client.id // Incluindo o ID do cliente na resposta
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao salvar a avaliação" });
        }
    } else {
        return res.status(405).json({ message: "Método não permitido" });
    }
}
