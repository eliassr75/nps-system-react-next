import { useState } from "react";
import { useRouter } from 'next/router';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBCardTitle } from "mdb-react-ui-kit";

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (res.ok) {
            router.push('/admin/'); // Redireciona para o painel administrativo
        } else {
            const data = await res.json();
            alert(data.message || 'Erro ao fazer login');
        }
    };

    return (
        <MDBContainer className="my-5">
            <MDBRow className="justify-content-center">
                <MDBCol md="6">
                    <MDBCard>
                        <MDBCardBody>
                            <MDBCardTitle className="text-center">Login</MDBCardTitle>
                            <form onSubmit={handleLogin}>
                                <MDBInput
                                    label="Email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="mb-3"
                                />
                                <MDBInput
                                    label="Senha"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="mb-4"
                                />
                                <MDBBtn type="submit" color="primary" block>
                                    Entrar
                                </MDBBtn>
                            </form>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default Login;
