import { useEffect } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";

function Modal({ active, setActive, id, children }) {
  const closeModal = () => {
    setActive(false);
  };

  const escButtonHandler = (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", escButtonHandler);
    return () => {
      document.removeEventListener("keydown", escButtonHandler);
    };
  }, []);

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
  isConstructor: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.object.isRequired),
};
export default Modal;
