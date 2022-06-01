import { FC, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../utils/hook";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./feed-order-item.module.css";
import FeedOrderIngridient from "../feed-order-ingridient/feed-order-ingridient";
import { Link, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { getUserOrder } from "../../services/reducers/get-data";


type TFeedOrderItem = {
  data: {
    createdAt: string;
    ingredients: [];
    name: string;
    number: number;
    status: string;
    updatedAt: string;
    _id: string;
  };
  route: string;
};

const FeedOrderItem: FC<TFeedOrderItem> = ({ data, route }) => {
  const [modalActive, setModalActive] = useState<boolean>(false);
  const ingredients = useAppSelector((state) => state.getData.ingridients);
  const location = useLocation();
  const dispatch = useAppDispatch();

  const filtredIngredients = data.ingredients.map((item) => {
    const result = ingredients.filter((image) => image._id === item)[0];
    const obj = { ...result, _uniqueId: uuidv4() };
    return obj;
  });

  
  const summ = filtredIngredients.reduce((acc, obj) => {
    if (obj.type === "bun") {
      return acc + obj.price * 2;
    } 
    return acc + obj.price;
  }, 0);

  const formatDate = (date: string): string => {
    const orderDate = new Date(date).setHours(0, 0, 0, 0);
    const currentDate = new Date().setHours(0, 0, 0, 0);
    let day = new Date(orderDate).toLocaleDateString("ru-RU", {});
    if (orderDate === currentDate) {
      day = "Сегодня";
    } else if (currentDate - orderDate === 24 * 60 * 60 * 1000) {
      day = "Вчера";
    }
    const time = new Date(date).toLocaleTimeString("ru-Ru", {
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });
    return `${day}, ${time}`;
  };

  const orderObject = {
    ingridients : filtredIngredients,
    orderSumm : summ,
    orderId : data._id,
    orderName: data.name,
    orderDate : formatDate(data.createdAt)
  }
  
  return (
    <>
      <Link to={`${route}/${data._id}`} state={{ background: location }} >
        <div onClick={() => dispatch(getUserOrder(orderObject))}>
        <div className={styles.order_body} onClick={() => setModalActive(true)}>
          <div className="order_title grid grid-cols-2 items-center px-6 pt-5">
            <p className={styles.order_number}>#{data.number}</p>
            <p className={`${styles.order_time} justify-self-end`}>{formatDate(data.createdAt)}</p>
          </div>
          <div className={`${styles.order_name} px-6`}>
            <p>{data.name}</p>
          </div>
          <div className="order_ingridients grid grid-cols-2 items-center py-5">
            <div className={styles.ingredients_parent}>
              {filtredIngredients &&
                filtredIngredients.map((item: any, i: number) => {
                  if (i <= 5) {
                    return (
                      <FeedOrderIngridient item={item} key={item._uniqueId} amount={i === 5 ? data.ingredients.length - 5 : undefined} />
                    );
                  }
                })}
            </div>
            <div className="flex items-center gap-2 justify-self-end pr-6">
              <p className={styles.order_number}>{summ}</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
        </div>

      </Link>
    </>
  );
};
export default FeedOrderItem;
