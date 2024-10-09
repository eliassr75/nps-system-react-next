import { useModal } from "../context/ModalContext";
import { React, useEffect } from "react";

export default function Alert(params) {
    const { openModal, closeModal } = useModal();

    useEffect(() => {
        if (params) {
            openModal(params);
        }
        return () => closeModal(); // Fecha o modal quando o componente é desmontado ou params muda
    }, [params, openModal, closeModal]);
}
