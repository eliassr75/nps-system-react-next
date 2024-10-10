import { useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "../context/UserContext";
import JsonStorage from "../app_lib/JsonStorage";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput,
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
} from "mdb-react-ui-kit";

export async function getServerSideProps(context) {
    const { req } = context;
    const token = req.cookies.token; // Coletando o token do cookie

    // Verifica se o token existe
    if (token) {
        return {
            redirect: {
                destination: "/admin",
                permanent: false,
            },
        };
    }

    return {
        props: {}, // Retornando props vazias
    };
}

const Login = () => {

    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useUser();

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (res.ok) {
            const data = await res.json();
            setUser(data.user);
            if (data.user){
                JsonStorage.updateLocalStorage(data.user);
            }
            router.push("/admin/");
        } else {
            const data = await res.json();
            alert(data.message || "Erro ao fazer login");
        }
    };

    return (
        <MDBContainer className="my-5">
            <MDBRow className="justify-content-center">
                <MDBCol md="6">
                    <MDBCard>
                        <MDBCardBody>
                            <MDBCardTitle className="text-center">
                                Login
                            </MDBCardTitle>
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
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
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
