import React from "react";
import {
    MDBNavbar,
    MDBBtn,
    MDBCardBody,
    MDBContainer,
    MDBDropdown,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBDropdownItem,
} from "mdb-react-ui-kit";
import Logout from "../components/Logout";

export default function NavBar() {
    return (
        <MDBNavbar light bgColor="light" className="mb-3 rounded-4">
            <MDBContainer tag="form" fluid className="justify-content-between">
                <div>
                    <MDBDropdown>
                        <MDBDropdownToggle tag="a" 
                            color="success"
                            className="btn btn-outline-success me-2"
                        >
                            Menu
                        </MDBDropdownToggle>
                        <MDBDropdownMenu>
                            <MDBDropdownItem link="/admin/">Dashboard</MDBDropdownItem>
                            <MDBDropdownItem link>
                                Pesquisas
                            </MDBDropdownItem>
                            <MDBDropdownItem link>
                                Clientes
                            </MDBDropdownItem>
                            <MDBDropdownItem link>
                                Usuários
                            </MDBDropdownItem>
                        </MDBDropdownMenu>
                    </MDBDropdown>
                </div>
                <Logout />
            </MDBContainer>
        </MDBNavbar>
    );
}
