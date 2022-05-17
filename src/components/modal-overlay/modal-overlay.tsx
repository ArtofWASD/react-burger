import { FC } from "react";
import styles from "./modal-overlay.module.css";

type TModalOverlay = {
  isActive: boolean;
  onClose: () => void;
};

const ModalOverlay: FC<TModalOverlay> = ({ isActive, onClose }) => {
  return <section className={isActive ? styles.modalOverlayActive : styles.modalOverlay} onClick={onClose}></section>;
};
export default ModalOverlay;
