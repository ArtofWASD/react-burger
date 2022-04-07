import { useState } from "react";
import { useSelector } from "react-redux";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import PropTypes from "prop-types";
import Modal from "../modal/modal";

import IngredientDetails from "../ingredient-details/ingredient-details";
import styles from "../burger-ingridient-list-item/burger-ingridient-list-item.module.css";

function BurgerIngridientItem({ data }) {
  const [modalActive, setModalActive] = useState(false);
  const [currentIngredientId, setCurrentIngredientId] = useState();
  const { _id, name, image_large, price } = data;
  const { counter } = useSelector((state) => state.getData);
  const countValue = counter.find((item) => item._id === _id);
  const [{ opacity }, dragRef] = useDrag({
    type: "ingredient",
    item: { ...data },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  return (
    <section>
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
      {modalActive && (
          <Modal active={modalActive} setActive={setModalActive} id={currentIngredientId}>
            <IngredientDetails itemId={currentIngredientId} />
          </Modal>
        )}
    </section>
  );
}

export default BurgerIngridientItem;
