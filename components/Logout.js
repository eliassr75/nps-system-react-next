import { useUser } from "../context/UserContext";
import { useRouter } from 'next/router';
import { MDBBtn } from "mdb-react-ui-kit";

const Logout = () => {

    const { setUser } = useUser();
    const router = useRouter();

    const handleLogout = async () => {
        const res = await fetch('/api/logout', {
            method: 'POST',
        });

        if (res.ok) {
            // Redireciona para a página de login ou inicial após o logout
            setUser(null);
            router.push('/login');
        } else {
            alert('Erro ao tentar fazer logout');
        }
    };
    
    return (
        <MDBBtn onClick={handleLogout} outline color="warning" size="md" type="button">
            Sair
        </MDBBtn>
    )
};

export default Logout;
