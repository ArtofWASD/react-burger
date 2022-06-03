import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOrderByNumber } from "../../services/reducers/get-data";
import { formatDate, generateIngredientsWithAmount } from "../../utils/handler-functions";
import { useAppDispatch, useAppSelector } from "../../utils/hook";
import { v4 as uuidv4 } from "uuid";
import { FeedOrderInfoIngredient } from "../feed-order-info-ingredient/feed-order-info-ingredient";
import styles from "./feed-order-info.module.css";

type TData = {
  _id: string;
};

const FeedOrderInfo: FC = () => {
  const { id } = useParams();
  const ingredientsAll = useAppSelector((state) => state.getData.ingridients);
  const order = useAppSelector((state) => state.getData.userOrder);
  const dispatch = useAppDispatch();
  
  let orderId = Number(id);
  useEffect(() => {
    dispatch(getOrderByNumber(orderId));
  }, [dispatch, orderId]);

  const filtredIngredients = order.ingredients.map((item) => {
    const result = ingredientsAll.filter((data: TData) => data._id === item)[0];
    const obj = { ...result, _uniqueId: uuidv4(), count: 1 };
    return obj;
  });

  const res = ingredientsAll.length !== 0 ? generateIngredientsWithAmount(ingredientsAll, order.ingredients) : undefined

  const summ = filtredIngredients.reduce((acc, obj) => {
    if (obj.type === "bun") {
      return acc + obj.price * 2;
    }
    return acc + obj.price;
  }, 0);

  return (
    <>
      {orderId === order.number ? (
        <div className="grid grid-flow-row justify-center px-5">
            <div className={`${styles.feed_order_info_number} text-center`}>#{order.number}</div>
            <div className={`${styles.feed_order_info_text} pt-5`}>{order.name}</div>
            <div className="pt-2 pb-10">
              {order.status === "done" ? (
                <div className={styles.feed_order_status_success}>Выполнен</div>
              ) : (
                <div className={styles.feed_order_status_in_work}>В работе</div>
              )}
            </div>
            <div className={`${styles.feed_order_info_text}`}>Состав:</div>
            <div>{res && res.map((item: any) => <FeedOrderInfoIngredient data={item} key={item._uniqueId} />)}</div>
            <div className="grid grid-cols-2 justify-between items-center pt-5 pb-2">
              <div className={styles.feed_order_time}>{formatDate(order.createdAt)}</div>
              <div className={`${styles.feed_order_info_number} flex items-center gap-2 justify-self-end`}>
                {summ} <CurrencyIcon type="primary" />
              </div>
            </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
export default FeedOrderInfo;
