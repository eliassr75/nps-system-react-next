import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { MDBBtn } from "mdb-react-ui-kit";

const Logout = () => {
    const router = useRouter();

    const handleLogout = () => {
        Cookies.remove('token');
        router.push('/login');
    };
    
    return (
        <MDBBtn onClick={handleLogout} outline color="warning" size="md" type="button">
            Sair
        </MDBBtn>
    )
};

export default Logout;
