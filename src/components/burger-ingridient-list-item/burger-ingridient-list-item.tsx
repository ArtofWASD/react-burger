import { useState, FC } from "react";
import { useAppSelector } from "../../utils/hook";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import styles from "../burger-ingridient-list-item/burger-ingridient-list-item.module.css";

type TBurgerListItem = {
  data: {
    _id: string;
    name: string;
    image_large: string;
    price: number;
  };
  route: string;
};

const BurgerIngridientItem: FC<TBurgerListItem> = ({ data }) => {
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [currentIngredientId, setCurrentIngredientId] = useState<string>('');
  const { _id, name, image_large, price } = data;
  const { counter } = useAppSelector((state) => state.getData);
  const countValue = counter.find((item) => item._id === _id);
  const location = useLocation();
  const [{ opacity }, dragRef] = useDrag({
    type: "ingredient",
    item: { ...data },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });
  return (
    <section>
      <Link to={`ingredients/${data._id}`} state={{ background: location }}>
        <div className="relative gap-2" onClick={() => setModalActive(true)} key={_id} ref={dragRef} style={{ opacity }}>
          <div
            className="flex flex-col items-center"
            onClick={() => {
              setCurrentIngredientId(_id);
            }}
          >
            {countValue && countValue.count !== 0 && <Counter count={countValue.count} size="default" />}
            <img src={image_large} alt={name} />
            <div className="flex items-center justify-center gap-2">
              <p className={styles.cardPrice}>{price}</p>
              <CurrencyIcon type="primary" />
            </div>
            <p className="text-center text-base pt-2">{name}</p>
          </div>
        </div>
      </Link>
    </section>
  );
};
export default BurgerIngridientItem;
