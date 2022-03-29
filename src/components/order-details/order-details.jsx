import doneImg from "../../images/done.svg";
import PropTypes from "prop-types";
import styles from "./order-details.module.css";

function OrderDetails({ orderId }) {
  return (
    <>
      {orderId && <div>
        <div className="flex flex-col justify-center items-center">
          <span className={styles.modalDoneId}>{orderId}</span>
          <p className={styles.modalDoneIdTitle}>идентификатор заказа</p>
          <div className="modal-done_img">
            <img src={doneImg} alt="" className={styles.modalDone} />
          </div>
          <p className={styles.modalDoneCocked}>Ваш заказ начали готовить</p>
          <p className={styles.modalDoneWait}>
            Дождитесь готовности на орбитальной станции
          </p>
        </div>
      </div>}
    </>
  );
}
OrderDetails.propType = {
  isActive: PropTypes.bool.isRequired,
  styles: PropTypes.string.isRequired,
  orderId: PropTypes.number.isRequired
};
export default OrderDetails;
