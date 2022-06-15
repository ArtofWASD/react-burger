import doneImg from "../../images/done.svg";
import orderimg from "../../images/order.png"
import styles from "./order-details.module.css";
import { useAppSelector } from "../../utils/hook";

function OrderDetails() {
  const orderId = useAppSelector((state) => state.getData.order.number);

  return (
    <>
      {!orderId ? (
        <div className="flex flex-col justify-center items-center">
          <p className={styles.modalDoneIdTitle}>Формируем ваш заказ </p>
          <img src={orderimg} alt="" className={styles.modalOrderImg} />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <span className={styles.modalDoneId}>{orderId}</span>
          <p className={`${styles.modalDoneIdTitle} modal_order_title`}>идентификатор заказа</p>
          <div className="modal-done_img">
            <img src={doneImg} alt="" className={styles.modalDone} />
          </div>
          <p className={styles.modalDoneCocked}>Ваш заказ начали готовить</p>
          <p className={styles.modalDoneWait}>Дождитесь готовности на орбитальной станции</p>
        </div>
      )}
    </>
  );
}
export default OrderDetails;
