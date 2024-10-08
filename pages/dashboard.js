import { useEffect, useState } from 'react';
import { MDBContainer, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

const Dashboard = () => {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/responses');
      const data = await res.json();
      setResponses(data);
    };

    fetchData();
  }, []);

  return (
    <MDBContainer className="my-5">
      <h1 className="mb-4">Dashboard de Avaliações NPS</h1>
      <MDBTable align="middle">
        <MDBTableHead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nome</th>
            <th scope="col">Nota</th>
            <th scope="col">Feedback</th>
            <th scope="col">Data</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {responses.map((response) => (
            <tr key={response.id}>
              <td>{response.id}</td>
              <td>{response.name} {response.phone ? `(${response.phone})` : ""}</td>
              <td>{response.score}</td>
              <td>{response.feedback || 'N/A'}</td>
              <td>{new Date(response.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </MDBContainer>
  );
};

export default Dashboard;
