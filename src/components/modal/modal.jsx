import React from "react";
import PropTypes from 'prop-types';
import closeBtn from "../../images/close.svg";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";
import doneImg from '../../images/done.svg'

function Modal({ active, setActive, id, data }) {
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
      className={active ? styles.modalOverlayActive : styles.modalOverlay}
      closeModal={closeModal}
    >
      {data &&
        data
          .filter((item) => item._id === id)
          .map((item) => (
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
                <div className="flex flex-col justify-center">
                  <img src={item.image_large} alt={item.name} />
                  <div className="flex justify-center">
                    <p className={styles.modalIngrTitle}>{item.name}</p>
                  </div>
                  <div className="flex justify-around pt-6">
                    <div className="flex flex-col items-center">
                      <p className={styles.modalIngrElems}>Каллории, ккал.</p>
                      <span className={styles.modalIngrWeight}>
                        {item.calories}{" "}
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <p className={styles.modalIngrElems}>Белки, г.</p>
                      <span className={styles.modalIngrWeight}>
                        {item.proteins}{" "}
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <p className={styles.modalIngrElems}>Жиры, г.</p>
                      <span className={styles.modalIngrWeight}>
                        {item.fat}{" "}
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <p className={styles.modalIngrElems}>Углеводы, г.</p>
                      <span className={styles.modalIngrWeight}>
                        {item.carbohydrates}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}
      {!data && (
        <section className={active ? styles.modalActive : styles.modal}>
          <div className='flex justify-end pt-8 px-8'>
            <img src={closeBtn} alt="Закрыть" onClick={closeModal} />
          </div>
          <div className='flex flex-col justify-center items-center'>
          <span className={styles.modalDoneId}>034536</span>
          <p className={styles.modalDoneIdTitle}>идентификатор заказа</p>
          <img src={doneImg} alt="" className={styles.modalDone}/>
          <p className={styles.modalDoneCocked}>Ваш заказ начали готовить</p>
          <p className={styles.modalDoneWait}>Дождитесь готовности на орбитальной станции</p>
          </div>
        </section>
      )}
    </ModalOverlay>
  );
}
Modal.propType={
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
  })
}
export default Modal;
