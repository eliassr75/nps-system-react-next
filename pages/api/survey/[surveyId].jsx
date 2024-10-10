import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function serializePrismaResponse(data) {
    return data.map((item) => ({
        ...item,
        id: item.id.toString(),
        createdAt: item.createdAt.toISOString(),
        client: {
            ...item.client,
            id: item.client.id.toString(),
            createdAt: item.client.createdAt.toISOString(),
            updatedAt: item.client.updatedAt ? item.client.updatedAt.toISOString(): null,
        },
        entity: {
            ...item.entity,
            id: item.entity.id.toString(),
            cnpj: item.entity.id.toString(),
            createdAt: item.entity.createdAt.toISOString(),
            updatedAt: item.entity.updatedAt ? item.entity.updatedAt.toISOString(): null,
        },
        survey: {
            ...item.survey,
            id: item.survey.id.toString(),
            createdAt: item.survey.createdAt.toISOString(),
            updatedAt: item.survey.updatedAt ? item.survey.updatedAt.toISOString(): null,
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
