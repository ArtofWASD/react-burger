import { useEffect, useCallback } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";

function Modal({ active, setActive, id, children }) {

  const closeModal = useCallback(
     () => {
      setActive(false);
    },[setActive]
  )

  const escButtonHandler = useCallback(
    (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    },[closeModal]
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
      <div className="flex justify-between items-center px-7 pt-10">
          <div>
            <p className={id ? styles.modalTitle : styles.modalTitleHide}>Детали ингридиента</p>
          </div>
        <div onClick={closeModal} className="flex justify-end">
          <CloseIcon type="primary" />
        </div>
      </div>
        {children}
      </div>
    </>,document.getElementById("modal")
  );
}

Modal.propTypes = {
  id: PropTypes.string,
  active: PropTypes.bool.isRequired,
  children:PropTypes.object.isRequired,
  setActive: PropTypes.func.isRequired
};
export default Modal;
