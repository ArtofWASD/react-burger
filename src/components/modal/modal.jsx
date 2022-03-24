import React from "react";
import closeBtn from "../../images/close.svg";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";

function Modal({ active, setActive, id, data }) {
  const closeModal = () => {
    setActive(false);
  };
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  });
  const res = data.filter((item) => item._id === id);
  return (
    <ModalOverlay
      className={active ? styles.modalOverlayActive : styles.modalOverlay}
      closeModal={closeModal}
    >
      {res.map((item) => (
        <section
          className={active ? styles.modalActive : styles.modal}
          key={item._id}
        >
          <div className="modal-content grid px-8 pt-8">
            <div className="flex justify-between items-center">
              <div>
              <p className={styles.modalTitle}>Детали ингридиента</p>
              </div>
              <div>
              <img src={closeBtn} alt="Закрыть" onClick={closeModal} />
              </div>
            </div>
            <div>
              <img src={item.image_large} alt={item.name} />
              {item.name}
              <div className="">
                <p>{item.calories}</p>
                <p>{item.carbohydrates}</p>
                <p>{item.fat}</p>
                <p>{item.proteins}</p>
              </div>
            </div>
          </div>
        </section>
      ))}
    </ModalOverlay>
  );
}
export default Modal;
