import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { surveyId, entityId, score, name, phone, feedback } = req.body;

        if (!surveyId || !entityId || !name || !phone || score === undefined) {
            return res.status(400).json({ message: "Dados inválidos" });
        }

        try {
            
            let clients = await prisma.Client.findMany({
                where: { 
                    entityId: entityId,
                    name: {
                        contains: name,
                    }
                },
            });
            
            let client;
            if (clients.length > 0) {
                client = clients[0];
            } else {
                
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
                    score: parseInt(score, 10),
                    feedback,
                },
            });
            return res.status(200).json({ 
                message: "Avaliação recebida!", 
                clientId: client.id
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao salvar a avaliação" });
        }
    } else {
        return res.status(405).json({ message: "Método não permitido" });
    }
}
