import React from "react";
import ReactDOM from "react-dom";

export default function ModalOverlay ({children, className, closeModal}){


    return ReactDOM.createPortal(
        <section className={className} onClick={closeModal}>
            {children}
        </section>, 
        document.querySelector('#modal') 
    )
}