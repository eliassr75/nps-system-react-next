import { useEffect } from 'react';
import { PrismaClient } from "@prisma/client";
import NpsForm from "../components/NpsForm";
import { useSurvey } from "../context/SurveyContext";
import { useEntity } from "../context/EntityContext";

const prisma = new PrismaClient();

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f0f0",
    },
    content: {
        textAlign: "center",
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    heading: {
        fontSize: "2rem",
        color: "#ff0000",
    },
    message: {
        fontSize: "1.2rem",
        color: "#333",
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

   
    const survey = await prisma.Survey.findUnique({
        where: { slug: slug },
    });

    if (!survey) {
       
        return {
            notFound: true,
        };
    }

   
    const entity = await prisma.Entity.findUnique({
        where: { id: survey.entityId },
    });

    if (!entity) {
       
        return {
            notFound: true,
        };
    }
    
    const response = {
        props: {
            values: {
                survey: {
                    ...survey,
                    createdAt: survey.createdAt.toISOString(),
                    updatedAt: survey.updatedAt ? survey.updatedAt.toISOString() : null,
                },
                entity: {
                    ...entity,
                    cnpj: entity.cnpj.toString(),
                    createdAt: entity.createdAt.toISOString(),
                    updatedAt: entity.updatedAt ? entity.updatedAt.toISOString() : null,
                }
            }
        },
    };
        
    return response;
}
