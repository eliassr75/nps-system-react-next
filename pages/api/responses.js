import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Função utilitária para converter BigInt e DateTime
function serializePrismaResponse(data) {
    return data.map((item) => ({
        ...item,
        id: item.id.toString(), // Convertendo BigInt para string
        createdAt: item.createdAt.toISOString(), // Convertendo DateTime para ISO string
        client: {
            ...item.client,
            id: item.client.id.toString(), // Convertendo BigInt do cliente
            createdAt: item.client.createdAt.toISOString(), // Convertendo DateTime para ISO string
            updatedAt: item.client.updatedAt ? item.client.updatedAt.toISOString(): null, // Se você tiver esse campo também
        },
        entity: {
            ...item.entity,
            id: item.entity.id.toString(), // Convertendo BigInt da entidade
            cnpj: item.entity.id.toString(), // Convertendo BigInt da entidade
            createdAt: item.entity.createdAt.toISOString(), // Convertendo DateTime para ISO string
            updatedAt: item.entity.updatedAt ? item.entity.updatedAt.toISOString(): null, // Se você tiver esse campo também
        },
        survey: {
            ...item.survey,
            id: item.survey.id.toString(), // Convertendo BigInt da pesquisa
            createdAt: item.survey.createdAt.toISOString(), // Convertendo DateTime para ISO string
            updatedAt: item.survey.updatedAt ? item.survey.updatedAt.toISOString(): null, // Se você tiver esse campo também
        }
    }));
}

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const responses = await prisma.npsResponse.findMany({
                include: {
                    client: true,
                    entity: true,
                    survey: true,
                },
            });

            // Convertemos os dados do Prisma para uma forma serializável
            const serializedResponses = serializePrismaResponse(responses);

            return res.status(200).json(serializedResponses);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao buscar as avaliações' });
        }
    } else {
        return res.status(405).json({ message: 'Método não permitido' });
    }
}
