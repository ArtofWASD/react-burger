import doneImg from "../../images/done.svg";
import closeBtn from "../../images/close.svg";
import PropTypes from "prop-types";

function OrderDetails({ onClose, isActive, styles }) {
  return (
    <>
      {isActive && (
        <div className={isActive ? styles.modalActive : styles.modal }>
          <div className="flex justify-end pt-8 px-8">
            <img src={closeBtn} alt="Закрыть" onClick={onClose} />
          </div>
          <div className="flex flex-col justify-center items-center">
            <span className={styles.modalDoneId}>034536</span>
            <p className={styles.modalDoneIdTitle}>идентификатор заказа</p>
            <div className="modal-done_img">
            <img src={doneImg} alt="" className={styles.modalDone} />
            </div>
            <p className={styles.modalDoneCocked}>Ваш заказ начали готовить</p>
            <p className={styles.modalDoneWait}>
              Дождитесь готовности на орбитальной станции
            </p>
          </div>
        </div>
      )}
    </>
  );
}
OrderDetails.propType={
  isActive: PropTypes.bool.isRequired,
  styles:PropTypes.string.isRequired
}
export default OrderDetails;
