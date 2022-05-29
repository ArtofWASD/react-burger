import { FC } from "react";
import styles from "./feed-order-ingridient.module.css"

type TItem = {
    item:any
}

const FeedOrderIngridient:FC<TItem> = ({item}) => {
  return (
    <>
      <div className={styles.order_ingridient_img_border}>
        <img src={item.image} alt={item.name} className={`${styles.order_ingridient_img}`} />
      </div>
    </>
  );
};

export default FeedOrderIngridient;
