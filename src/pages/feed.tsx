import styles from "./styles.module.css";
import FeedOrderItem from "../components/feed-order-item/feed-order-item";
import { useGetOrdersAllQuery } from "../services/reducers/socket";

type TItem = {
  _id: string;
  ingredients: [];
  status: string;
  name: string;
  number: number;
  createdAt: string;
  updatedAt: string;
};

export default function FeedPage() {
  const { data } = useGetOrdersAllQuery();
  return (
    <div className="grid mx-72 pt-10 absolute">
      <div>
        <div className={`${styles.font} text-4xl mb-5`}>Лента заказов</div>
      </div>
      {data !== undefined && data.orders.length !== 0 ? (
        <div className="grid grid-cols-2 justify-center gap-6">
          <div className={`${styles.orders_list} pt-5 order_list pr-20`}>
            {data.orders.map((item: TItem) => {
              return <FeedOrderItem data={item} key={item._id} route={`/feed`} />;
            })}
          </div>
          <div className="pt-5">
            <div className="grid grid-cols-2 orders_info">
              <div>
                <div className={`${styles.font} text-2xl pb-2`}>Готовы:</div>
                <ul>
                  {data.orders.slice(0, 10).map((item: TItem) => {
                    if (item.status === "done") {
                      return (
                        <li className={`${styles.number_green} text-2xl`} key={item._id}>
                          {item.number}
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
              <div>
                <div className={`${styles.font} text-2xl pb-5`}>В работе:</div>
                <ul>
                  {data.orders.slice(0, 10).map((item: TItem) => {
                    if (item.status === "created") {
                      return (
                        <li className={`${styles.number} text-2xl`} key={item._id}>
                          {item.number}
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
            </div>
            <div>
              <div className={`${styles.font} text-2xl pt-5`}>Выполнено за все время:</div>
              <span className={`${styles.number_big_glow}`}>{data.total}</span>
            </div>
            <div className={`${styles.font} text-2xl pt-5`}>Выполнено за сегодня:</div>
            <span className={`${styles.number_big_glow}`}>{data.totalToday}</span>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
