import Cookies from "js-cookie";
import Alert from "../app_lib/ModalAlert";
import { React, useEffect, useState } from "react";
import { useSurvey } from "../context/SurveyContext";
import { useEntity } from "../context/EntityContext";
import { MDBContainer, MDBInput, MDBTextArea, MDBBtn } from "mdb-react-ui-kit";

const NpsForm = () => {

    const { survey } = useSurvey();
    const { entity } = useEntity();

    const [entityObj, setEntity] = useState(null);
    const [surveyId, setSurveyId] = useState(null);
    const [entityId, setEntityId] = useState(null);
    const [score, setScore] = useState(null);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [feedback, setFeedback] = useState("");

    // Verifica se o cookie de bloqueio existe
    Cookies.remove("lastNpsResponseDate");
    const lastResponseDate = Cookies.get("lastNpsResponseDate");
    if (lastResponseDate) {
        const differenceInDays =
            (new Date() - new Date(lastResponseDate)) / (1000 * 3600 * 24);
        if (differenceInDays < 90) {
            Alert({
                title: "Meu Modal Personalizado",
                body: "Este é o conteúdo do modal.",
                size: "lg",
                classes: "custom-class",
            });
        }
    }

    useEffect(() => {
        const fetchSurvey = async () => {
            if (survey) {
                setSurveyId(survey.id);
                setEntityId(survey.entityId);
            }
        };
        fetchSurvey();
    }, [survey]);
    
    useEffect(() => {
        if(entity){
            setEntity(entity);
        }
    }, [entity]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (score === null) {
            alert("Selecione uma nota!");
            return;
        }

        if (name.trim() === "") {
            alert("O nome é obrigatório!");
            return;
        }

        const response = await fetch("/api/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                surveyId,
                entityId,
                score,
                name,
                phone,
                feedback,
            }), // Usar surveyId
        });

        if (response.ok) {
            // Define o cookie com a data atual ao enviar a avaliação com sucesso
            Cookies.set("lastNpsResponseDate", new Date().toISOString(), {
                expires: 90,
            });
            alert("Avaliação enviada! Obrigado pelo seu feedback.");
            window.location.reload();
        } else {
            alert("Ocorreu um erro. Tente novamente.");
        }
    };

    return (
        <MDBContainer>
            <form className="mt-5" onSubmit={handleSubmit}>
                <h1>Avaliação NPS - {entityObj ? entityObj.name : "Carregando..."}</h1>
                {surveyId === null ? ( // Verifica se a pesquisa não foi encontrada
                    <p>
                        Não foi encontrada nenhuma pesquisa disponível para esta
                        entidade.
                    </p>
                ) : (
                    <>
                        <div className="row p-2">
                            {survey.type === "minimal" ? (
                                <>
                                    <p>
                                        Qual a probabilidade de você nos recomendar de 1 a 5?
                                    </p>
                                    {[...Array(6).keys()].map((num) => {
                                        if (num > 0) {
                                            return (
                                                <MDBBtn
                                                    key={num}
                                                    name="score"
                                                    id={`score-${num}`}
                                                    color={
                                                        score === num ? "primary" : "secondary"
                                                    }
                                                    type="button"
                                                    onClick={() => setScore(num)}
                                                    className="col m-1 mb-1 btn btn-lg border border-1"
                                                >
                                                    {num}
                                                </MDBBtn>
                                            );
                                        }
                                        return null; // Retorna null se num for 0
                                    })}
                                </>
                            ) : (
                                <>
                                    <p>
                                        Qual a probabilidade de você nos recomendar de 0 a 10?
                                    </p>
                                    {[...Array(11).keys()].map((num) => (
                                        <MDBBtn
                                            key={num}
                                            name="score"
                                            id={`score-${num}`}
                                            color={
                                                score === num ? "primary" : "secondary"
                                            }
                                            type="button"
                                            onClick={() => setScore(num)}
                                            className="col m-1 mb-1 btn btn-lg border border-1"
                                        >
                                            {num}
                                        </MDBBtn>
                                    ))}
                                </>
                            )}
                        </div>

                        <div className="my-2">
                            <MDBInput
                                type="text"
                                label="Deixe seu nome (obrigatório)"
                                value={name}
                                required
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="my-2">
                            <MDBInput
                                type="tel"
                                label="Deixe um telefone (opcional)"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div className="my-2">
                            <MDBTextArea
                                label="Deixe um feedback (opcional)"
                                rows="4"
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                            />
                        </div>
                        <MDBBtn type="submit" className="mt-3 btn-lg">
                            Enviar
                        </MDBBtn>
                    </>
                )}
            </form>
        </MDBContainer>
    );
};

export default NpsForm;
