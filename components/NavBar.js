import { useUser } from "../context/UserContext";
import React, { useEffect, useState } from "react";
import {
    MDBNavbar,
    MDBBtn,
    MDBCardBody,
    MDBContainer,
    MDBDropdown,
    MDBNavbarBrand,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBDropdownItem,
} from "mdb-react-ui-kit";
import Logout from "../components/Logout";

export default function NavBar() {
    const { user } = useUser();
    const [userObj, setUserData] = useState(null);

    useEffect(() => {
        if (user) {
            setUserData(user);
        }
    }, [user]);

    return (
        <MDBNavbar light bgColor="light" className="mb-3 rounded-4">
            <MDBContainer tag="form" fluid className="justify-content-between">
                <MDBNavbarBrand href="#">
                    miniNPS - {userObj?.name}
                </MDBNavbarBrand>
                <div className="d-flex align-items-center">
                    <MDBDropdown>
                        <MDBDropdownToggle
                            tag="a"
                            color="success"
                            className="btn btn-outline-success me-2"
                        >
                            Menu
                        </MDBDropdownToggle>
                        <MDBDropdownMenu>
                            <MDBDropdownItem link href="/admin">Dashboard</MDBDropdownItem>
                            <MDBDropdownItem link href="/admin/surveys">Pesquisas</MDBDropdownItem>
                            <MDBDropdownItem link href="/client">Clientes</MDBDropdownItem>
                            {userObj &&
                                (userObj.role === "ADMIN" ||
                                    userObj.role === "MASTER") && (
                                    <MDBDropdownItem link>
                                        Usuários
                                    </MDBDropdownItem>
                                )}
                            {userObj && userObj.role === "MASTER" && (
                                <MDBDropdownItem link>Empresas</MDBDropdownItem>
                            )}
                        </MDBDropdownMenu>
                    </MDBDropdown>
                    <Logout />
                </div>
            </MDBContainer>
        </MDBNavbar>
    );
}
