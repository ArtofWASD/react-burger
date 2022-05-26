import { FC } from "react";
import { useAppSelector } from "../../utils/hook";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./feed-order-item.module.css";

const FeedOrderItem: FC = () => {
  const images = useAppSelector((state) => state.getData.ingridients);

  return (
    <>
      <div className={styles.order_body}>
        <div className="order_title grid grid-cols-2 items-center px-6 pt-5">
          <p className={styles.order_number}>#034512</p>
          <p className={`${styles.order_time} justify-self-end`}>Сегодня, 16:20 i-GMT+3</p>
        </div>
        <div className={`${styles.order_name} px-6`}>
          <p>Death Star Starship Main бургер</p>
        </div>
        <div className="order_ingridients grid grid-cols-2 items-center pt-10">
          <div className="grid grid-flow-col px-6">
            {images &&
              images.slice(0, 6).map((item, index) => (
                <>
                  <img src={item.image_mobile} alt={item.name} className={`${styles.order_img}`} />
                </>
              ))}
          </div>
          <div className="flex items-center gap-2 justify-self-end pr-6">
            <p className={styles.order_number}>480</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </>
  );
};
export default FeedOrderItem;
