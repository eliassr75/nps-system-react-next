// ModalContext.js
import React, { createContext, useContext, useState } from "react";
import {
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBBtn,
} from "mdb-react-ui-kit";

const ModalContext = createContext();

export const useModal = () => {
    return useContext(ModalContext);
};

export const ModalProvider = ({ children }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalProps, setModalProps] = useState({
        title: "",
        body: "",
        size: "md",
        classes: "",
    });

    const openModal = (props) => {
        setModalProps(props);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}
            <MDBModal
                open={modalOpen}
                onClose={closeModal}
                size={modalProps.size}
            >
                <MDBModalDialog>
                    <MDBModalContent className={modalProps.classes}>
                        <MDBModalHeader>
                            <MDBModalTitle>{modalProps.title}</MDBModalTitle>
                            <MDBBtn
                                className="btn-close"
                                color="none"
                                onClick={closeModal}
                            ></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>{modalProps.body}</MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="secondary" onClick={closeModal}>
                                Close
                            </MDBBtn>
                            <MDBBtn>Save changes</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </ModalContext.Provider>
    );
};
