import { useEffect } from "react";
import styles from "./styles.module.css";
import FeedOrderItem from "../components/feed-order-item/feed-order-item";
import { fetchFeed } from "../services/reducers/socket";
import { useAppDispatch } from "../utils/hook";

export default function FeedPage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchFeed())
  },[])
  return (
    <div className="grid mx-72 pt-10">
      <div>
        <div className={`${styles.font} text-4xl mb-5`}>Лента заказов</div>
      </div>
      <div className="grid grid-cols-2 justify-center gap-6">
        <div className={`${styles.orders_list} pt-5 order_list pr-20`}>
          <FeedOrderItem />
          <FeedOrderItem />
          <FeedOrderItem />
          <FeedOrderItem />
          <FeedOrderItem />
        </div>
        <div className="pt-5">
          <div className="grid grid-cols-2 orders_info">
            <div>
              <div className={`${styles.font} text-2xl pb-5`}>Готовы:</div>
              <ul>
                <li className={`${styles.number_green} text-2xl`}>034544</li>
                <li className={`${styles.number_green} text-2xl`}>034543</li>
                <li className={`${styles.number_green} text-2xl`}>034545</li>
                <li className={`${styles.number_green} text-2xl`}>034546</li>
                <li className={`${styles.number_green} text-2xl`}>034547</li>
                <li className={`${styles.number_green} text-2xl`}>034548</li>
              </ul>
            </div>
            <div>
              <div className={`${styles.font} text-2xl pb-5`}>В работе:</div>
              <ul>
                <li className={`${styles.number} text-2xl`}>123456</li>
                <li className={`${styles.number} text-2xl`}>123456</li>
                <li className={`${styles.number} text-2xl`}>123456</li>
                <li className={`${styles.number} text-2xl`}>123456</li>
              </ul>
            </div>
          </div>
          <div>
            <div className={`${styles.font} text-2xl pt-14`}>Выполнено за все время:</div>
            <span className={`${styles.number_big_glow}`}>28752</span>
          </div>
          <div className={`${styles.font} text-2xl pt-14`}>Выполнено за сегодня:</div>
          <span className={`${styles.number_big_glow}`}>100</span>
        </div>
      </div>
    </div>
  );
}
