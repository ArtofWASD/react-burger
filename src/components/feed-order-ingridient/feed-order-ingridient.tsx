import { FC } from "react";
import styles from "./feed-order-ingridient.module.css";

type TItem = {
  item: {
    image: string;
    name: string;
  };
  amount: number | undefined;
};

const FeedOrderIngridient: FC<TItem> = ({ item, amount }) => {  
  return (
    <>
      <div className={styles.order_ingridient_img_border}>
        {amount && amount !== undefined ? (
          <div>
            <img src={item.image} alt={item.name} className={`${styles.order_ingridient_img}`} />
            <div className={`${styles.image_overlay}`} />
            <p className={`${styles.amount} text-xl`}>+{amount}</p>
          </div>
        ) : (
          <img src={item.image} alt={item.name} className={`${styles.order_ingridient_img}`} />
        )}
      </div>
    </>
  );
};

export default FeedOrderIngridient;
