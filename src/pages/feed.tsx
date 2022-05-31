import { useEffect } from "react";
import styles from "./styles.module.css";
import FeedOrderItem from "../components/feed-order-item/feed-order-item";
import { wsInit, wsClose } from "../services/reducers/socket";
import { useAppDispatch, useAppSelector } from "../utils/hook";

export default function FeedPage() {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.socketData.data)

  useEffect(() => {
    dispatch(wsInit({}));
    return()=>{
      dispatch(wsClose({}))
    }
  }, []);

  return (
    <div className="grid mx-72 pt-10 absolute">
      <div>
        <div className={`${styles.font} text-4xl mb-5`}>Лента заказов</div>
      </div>
      <div className="grid grid-cols-2 justify-center gap-6">
        <div className={`${styles.orders_list} pt-5 order_list pr-20`}>
          {data && data.orders.map((item:any) =>{
            return(
              <FeedOrderItem data={item} key={item._id}/>
            )
          })}
          
        </div>
        <div className="pt-5">
          <div className="grid grid-cols-2 orders_info">
            <div>
              <div className={`${styles.font} text-2xl pb-5`}>Готовы:</div>
              <ul>
                {data && data.orders.slice(0,6).map((item:any) =>{
                  return(<li className={`${styles.number_green} text-2xl`} key={item._id}>{item.number}</li>)
                })}
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
            <span className={`${styles.number_big_glow}`}>{data.total}</span>
          </div>
          <div className={`${styles.font} text-2xl pt-14`}>Выполнено за сегодня:</div>
          <span className={`${styles.number_big_glow}`}>{data.totalToday}</span>
        </div>
      </div>
    </div>
  );
}
