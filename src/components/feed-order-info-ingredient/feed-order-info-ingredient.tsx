import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";
import styles from "./feed-order-info-ingredient.module.css";
type TFeedOrderIngredientItem = {
  data: {
    name: string;
    price: number;
    image: string;
    type: string;
    amount: number;
  };
};
export const FeedOrderInfoIngredient: FC<TFeedOrderIngredientItem> = ({ data }) => {
  return (
    <div className="flex justify-between items-center gap-4">
      <div className="flex gap-4 items-center py-2">
        <div className={styles.modal_feed_img_border}>
          <img src={data.image} alt="" className={styles.modal_feed_img} />
        </div>
        <div className={styles.modal_feed_text}>{data.name}</div>
      </div>
      <div className="flex gap-4 items-center">
        {data.type === "bun" ? (
          <div className={styles.modal_feed_number}>{data.amount} x </div>
        ) : (
          <div className={styles.modal_feed_number}>{data.amount} x </div>
        )}
        <div className={styles.modal_feed_number}>{data.price}</div>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
};
