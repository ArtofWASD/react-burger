import { FC, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../utils/hook";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./feed-order-item.module.css";
import FeedOrderIngridient from "../feed-order-ingridient/feed-order-ingridient";
import { Link, useLocation } from "react-router-dom";

const FeedOrderItem: FC = (data) => {
  const ingridients = useAppSelector((state) => state.getData.ingridients);
  const location = useLocation()
  return (
    <>
      <Link to={`feed/${data}`} state={{ background: location }}>
        <div className={styles.order_body}>
          <div className="order_title grid grid-cols-2 items-center px-6 pt-5">
            <p className={styles.order_number}>#034512</p>
            <p className={`${styles.order_time} justify-self-end`}>Сегодня, 16:20 i-GMT+3</p>
          </div>
          <div className={`${styles.order_name} px-6`}>
            <p>Death Star Starship Main бургер</p>
          </div>
          <div className="order_ingridients grid grid-cols-2 items-center pt-10">
            <div className={styles.ingredients_parent}>
              {ingridients && ingridients.map((item, i) => {
                if (i<=5) {
                  return(
                    <FeedOrderIngridient item={item} key={item._id} amount= {i === 5 ? ingridients.length -5 : undefined} />
                  )
                }
              })}
            </div>
            <div className="flex items-center gap-2 justify-self-end pr-6">
              <p className={styles.order_number}>480</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};
export default FeedOrderItem;
