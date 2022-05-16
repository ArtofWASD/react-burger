import { useEffect, useCallback, FC } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import ModalTitle from "../modal-title/modal-title";
import { ReactNode } from "react";

type TModal = {
  title?: string;
  children: ReactNode;
  active: boolean;
  setActive: (arg:boolean) => void;
};

const Modal: FC<TModal> = ({ active, setActive, children, title }) => {

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
    (document.getElementById("modal") as HTMLElement)
  );
};
export default Modal;
