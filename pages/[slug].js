import { useEffect } from 'react';
import { PrismaClient } from "@prisma/client";
import NpsForm from "../components/NpsForm";
import { useSurvey } from "../context/SurveyContext";
import { useEntity } from "../context/EntityContext";

const prisma = new PrismaClient();

// Estilos para centralizar o conteúdo
const styles = {
    container: {
        display: "flex",
        justifyContent: "center", // Centraliza horizontalmente
        alignItems: "center", // Centraliza verticalmente
        height: "100vh", // Define a altura para 100% da viewport
        backgroundColor: "#f0f0f0", // Fundo cinza claro para destacar a mensagem
    },
    content: {
        textAlign: "center", // Alinha o texto no centro
        padding: "20px",
        backgroundColor: "#fff", // Fundo branco para o aviso
        borderRadius: "8px", // Bordas arredondadas
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Sombra para dar destaque
    },
    heading: {
        fontSize: "2rem",
        color: "#ff0000", // Cor vermelha para o título de erro
    },
    message: {
        fontSize: "1.2rem",
        color: "#333", // Cor cinza para o texto da mensagem
    },
};

export default function SlugPage({ values }) {

    const { setSurvey } = useSurvey();
    const { setEntity } = useEntity();
    
    useEffect(() => {
        if (values) {
            setEntity(values.entity);
        }
    }, [values.entity, setEntity]);

    useEffect(() => {
        if (values) {
            setSurvey(values.survey);
        }
    }, [values.survey, setSurvey]);

    if (!values) {
        return (
            <div style={styles.container}>
                <div style={styles.content}>
                    <h1 style={styles.heading}>Erro 404</h1>
                    <p style={styles.message}>Pesquisa não encontrada</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <NpsForm/>
        </div>
    );
}

// Busca de dados do lado do servidor
export async function getServerSideProps(context) {
    const { slug } = context.params;    

    // Buscando a pesquisa com base no slug
    const survey = await prisma.Survey.findUnique({
        where: { slug: slug },
    });

    if (!survey) {
        // Retornar 404 se o slug não for encontrado
        return {
            notFound: true,
        };
    }

    // Buscando a entidade com base no slug
    const entity = await prisma.Entity.findUnique({
        where: { id: survey.entityId },
    });

    if (!entity) {
        // Retornar 404 se a entidade não for encontrada
        return {
            notFound: true,
        };
    }
    
    const response = {
        props: {
            values: {
                survey: {
                    ...survey,
                    createdAt: survey.createdAt.toISOString(), // Convertendo Date para string
                    updatedAt: survey.updatedAt ? survey.updatedAt.toISOString() : null, // Caso tenha esse campo também
                }, // Enviando os dados tratados para o componente
                entity: {
                    ...entity,
                    cnpj: entity.cnpj.toString(), // Convertendo BigInt para string
                    createdAt: entity.createdAt.toISOString(), // Convertendo Date para string
                    updatedAt: entity.updatedAt ? entity.updatedAt.toISOString() : null, // Caso tenha esse campo também
                }
            }
        },
    };
        
    return response;
}
