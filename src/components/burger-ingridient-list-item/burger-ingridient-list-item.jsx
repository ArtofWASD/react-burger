import { useState } from "react";
import { useSelector } from "react-redux";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import { Link } from "react-router-dom";
import IngredientDetails from "../ingredient-details/ingredient-details";
import styles from "../burger-ingridient-list-item/burger-ingridient-list-item.module.css";

function BurgerIngridientItem({ data, route }) {
  const [modalActive, setModalActive] = useState(false);
  const [currentIngredientId, setCurrentIngredientId] = useState();
  const { _id, name, image_large, price } = data;
  const { counter, ingridientModalTitle } = useSelector((state) => state.getData);
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
      <Link to={`ingredients/${data._id}`}>
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
      {/* {modalActive && (
          <Modal active={modalActive} setActive={setModalActive} id={currentIngredientId} title={ingridientModalTitle}>
            <IngredientDetails itemId={currentIngredientId} />
          </Modal>
        )} */}
    </section>
  );
}
BurgerIngridientItem.propTypes={
  data: PropTypes.object.isRequired
}
export default BurgerIngridientItem;
