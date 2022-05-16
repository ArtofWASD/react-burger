import doneImg from "../../images/done.svg";
import styles from "./order-details.module.css";
import { useAppSelector } from '../../utils/hook';

function OrderDetails() {

  const orderId = useAppSelector((state) => state.getData.order.number);

  return (
    <>
      {orderId && (
          <div className="flex flex-col justify-center items-center">
            <span className={styles.modalDoneId}>{orderId}</span>
            <p className={styles.modalDoneIdTitle}>идентификатор заказа</p>
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
