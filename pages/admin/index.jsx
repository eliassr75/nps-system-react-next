import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import {
    MDBContainer,
    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBCard,
    MDBCardBody,
} from "mdb-react-ui-kit";

import DataTable from 'datatables.net-react';
import DT from 'datatables.net-bs5';
 
DataTable.use(DT);

const Dashboard = () => {
    const [responses, setResponses] = useState([]);
    const [entityObj, setEntity] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("/api/responses");
            const data = await res.json();
            setResponses(data);
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (responses.length) {
            setEntity(responses[0].entity);
        }
    }, [responses]);

    return (
        <MDBContainer className="my-5">
            <NavBar />
            <MDBCard>
                <MDBCardBody>
                    <h1 className="mb-4">
                        Dashboard de Avaliações NPS -{" "}
                        {entityObj ? entityObj.name : "Carregando..."}
                    </h1>
                    <MDBTable align="middle" small responsive>
                        <MDBTableHead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Pesquisa</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Nota</th>
                                <th scope="col">Feedback</th>
                                <th scope="col">Data</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {responses.length ? (
                                responses.map((response) => (
                                    <tr key={response.id}>
                                        <td>{response.id}</td>
                                        <td>{response.survey.name}</td>
                                        <td>
                                            {response.client.name}{" "}
                                            {response.client.phone
                                                ? `(${response.client.phone})`
                                                : ""}
                                        </td>
                                        <td>{response.score}</td>
                                        <td>{response.feedback || "N/A"}</td>
                                        <td>
                                            {new Date(
                                                response.createdAt
                                            ).toLocaleString()}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">
                                        Nenhuma resposta encontrada ...
                                    </td>
                                </tr>
                            )}
                        </MDBTableBody>
                    </MDBTable>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    );
};

export default Dashboard;
