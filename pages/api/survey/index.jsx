import Survey from "../../../models/Survey";

function serializePrismaResponse(data) {
    return data.map((item) => ({
        ...item,
        id: item.id.toString(),
        createdAt: item.createdAt.toISOString(),
        updatedAt: item.updatedAt ? item.updatedAt.toISOString() : null,
        entity: {
            ...item.entity,
            id: item.entity.id.toString(),
            cnpj: item.entity.id.toString(),
            createdAt: item.entity.createdAt.toISOString(),
            updatedAt: item.entity.updatedAt
                ? item.entity.updatedAt.toISOString()
                : null,
        },
    }));
}

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const SurveyModel = new Survey();
            const responses = await SurveyModel.findAll({
                include: {
                    entity: true,
                    NpsResponse: true,
                },
            });

            const serializedResponses = serializePrismaResponse(responses);

            return res.status(200).json(serializedResponses);
        } catch (error) {
            console.error(error);
            return res
                .status(500)
                .json({ message: "Erro ao buscar as pesquisas" });
        }
    } else {
        return res.status(405).json({ message: "Método não permitido" });
    }
}
