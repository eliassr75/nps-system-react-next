// components/CustomModal.js
import React from "react";
import {
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBBtn
} from "mdb-react-ui-kit";

const CustomModal = ({ title, show, onClose, children, onSave }) => {
    return (
        <MDBModal tabIndex="-1" id="CustomModal" open={show} onClose={onClose}>
            <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>{title}</MDBModalTitle>
                        <MDBBtn
                            className="btn-close"
                            color="none"
                            onClick={() => onClose()}
                        ></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody>{children}</MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={() => onClose()}>
                            Fechar
                        </MDBBtn>
                        <MDBBtn color="primary" onClick={onSave}>
                            Salvar Alterações
                        </MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
};

export default CustomModal;
