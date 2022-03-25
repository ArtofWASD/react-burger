import React from "react";
import ReactDOM from "react-dom";

function ModalOverlay ({children, className, closeModal}){
    return ReactDOM.createPortal(
        <section className={className} onClick={closeModal}>
            {children}
        </section>,
        document.getElementById('modal') 
    )
}
export default ModalOverlay