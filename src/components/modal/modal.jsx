import { useEffect, useCallback } from "react";

import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import ModalTitle from "../modal-title/modal-title";

function Modal({ active, setActive, children, title }) {
  const closeModal = useCallback(() => {
    setActive(false);
  }, [setActive]);

  const escButtonHandler = useCallback(
    (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    },
    [closeModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", escButtonHandler);
    return () => {
      document.removeEventListener("keydown", escButtonHandler);
    };
  }, [escButtonHandler]);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay isActive={active} onClose={closeModal} />
      <div className={active ? styles.modalActive : styles.modal}>
        <ModalTitle onClose={closeModal} title={title} />
        {children}
      </div>
    </>,
    document.getElementById("modal")
  );
}

Modal.propTypes = {
  id: PropTypes.string,
  active: PropTypes.bool.isRequired,
  children: PropTypes.object.isRequired,
  setActive: PropTypes.func,
  title: PropTypes.string,
};
export default Modal;
