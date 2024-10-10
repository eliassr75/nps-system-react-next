import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import UserData from "../../app_lib/UserData";
import CustomModal from "../../components/CustomModal";
import {
    MDBContainer,
    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBCard,
    MDBCardBody,
    MDBBtn
} from "mdb-react-ui-kit";

const Dashboard = () => {
    const [responses, setResponses] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedSurvey, setSelectedSurvey] = useState(null);
    const user = UserData();

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("/api/survey/");
            const data = await res.json();
            setResponses(data);
        };

        fetchData();
    }, []);

    const handleEditClick = (survey) => {
        setSelectedSurvey(survey);
        setModalOpen(true); // Abre o modal
    };

    const handleSaveChanges = async () => {
        // Lógica de salvar as alterações da pesquisa
        // Por exemplo: faça um PUT/POST para a API para salvar a pesquisa
        console.log('Salvando alterações:', selectedSurvey);

        // Fechar o modal após salvar
        setModalOpen(false);
    };

    const handleModalClose = () => {
        setModalOpen(false); // Fecha o modal
    };

    return (
        <MDBContainer className="my-5">
            <NavBar />
            <MDBCard>
                <MDBCardBody className="table-responsive">
                    <h1 className="mb-4">Pesquisas Cadastradas</h1>
                    <MDBTable align="middle">
                        <MDBTableHead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nome</th>
                                {user && user.role === "MASTER" && (
                                    <th scope="col">Empresa</th>
                                )}
                                <th scope="col">Tipo</th>
                                <th scope="col">Feedbacks</th>
                                <th scope="col">Data</th>
                                <th scope="col">Ações</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {responses.length ? (
                                responses.map((response) => (
                                    <tr key={response.id}>
                                        <td>{response.id}</td>
                                        <td>{response.name}</td>
                                        {user && user.role === "MASTER" && (
                                            <td>{response.entity.name}</td>
                                        )}
                                        <td>{response.type}</td>
                                        <td>{response.NpsResponse.length || "N/A"}</td>
                                        <td>{new Date(response.createdAt).toLocaleString()}</td>
                                        <td>
                                            <MDBBtn
                                                color="warning"
                                                onClick={() => handleEditClick(response)}
                                            >
                                                Editar
                                            </MDBBtn>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6">Nenhuma resposta encontrada...</td>
                                </tr>
                            )}
                        </MDBTableBody>
                    </MDBTable>
                </MDBCardBody>
            </MDBCard>

            {selectedSurvey && (
                <CustomModal
                    title="Editar Pesquisa"
                    show={modalOpen}
                    onClose={handleModalClose}
                    onSave={handleSaveChanges}
                >
                    <div className="mb-3">
                        <label>Nome da Pesquisa</label>
                        <input
                            type="text"
                            className="form-control"
                            value={selectedSurvey.name}
                            onChange={(e) =>
                                setSelectedSurvey({
                                    ...selectedSurvey,
                                    name: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="mb-3">
                        <label>Tipo de Pesquisa</label>
                        <input
                            type="text"
                            className="form-control"
                            value={selectedSurvey.type}
                            onChange={(e) =>
                                setSelectedSurvey({
                                    ...selectedSurvey,
                                    type: e.target.value,
                                })
                            }
                        />
                    </div>
                </CustomModal>
            )}
        </MDBContainer>
    );
};

export default Dashboard;
