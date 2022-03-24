import React, { useState } from "react";
import ReactDOM from "react-dom";
import closeBtn from "../../images/close.svg";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";

function Modal({ active, setActive }) {
  const closeModal = () => {
    setActive(false);
  };
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeModal();
    }
  });
  return (
    <ModalOverlay
      className={active ? styles.modalOverlayActive : styles.ModalOverlay}
      closeModal={closeModal}
    >
      <section className={active ? styles.modalActive : styles.modal}>
        <div className="modal-content flex justify-between items-center px-8 pt-8">
          <div className="modal-title">
            <p className={styles.modalTitle}>Модальное окно</p>
          </div>
          <div className="modal-close">
            <img src={closeBtn} alt="Закрыть" onClick={closeModal} />
          </div>
        </div>
      </section>
    </ModalOverlay>
  );
}
export default Modal;
