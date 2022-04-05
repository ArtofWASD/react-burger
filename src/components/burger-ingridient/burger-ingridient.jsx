import { useState} from "react";
import { useSelector } from "react-redux";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import styles from "./burger-ingridient.module.css";

function BurgerIngridient({ type }) {
  const [modalActive, setModalActive] = useState(false);
  const [currentIngredientId, setCurrentIngredientId] = useState();
  const {ingridients, error} = useSelector(state=>state.getData)
  const ingridientType = ingridients.filter(item=>item.type === type);

  return (
    <div className="grid grid-cols-2 gap-3">
      {error && <h2>{error}</h2>}
      {ingridientType.map((item) => (
        <div
          className="relative gap-2"
          key={item._id}
          onClick={() => setModalActive(true)}
        >
          <div
            className="flex flex-col items-center"
            onClick={() => {
              setCurrentIngredientId(item._id);
            }}
          >
            <Counter count={1} size="default" />
            <img src={item.image_large} alt={item.name} />
            <div className="flex items-center justify-center gap-2">
              <p className={styles.cardPrice}>{item.price}</p>
              <CurrencyIcon type="primary" />
            </div>
            <p className="text-center text-base pt-2">{item.name}</p>
          </div>
        </div>
      ))}
      {/* Модальное окно с инофрмацией об ингридиенте */}
      {modalActive && (
        <Modal
          active={modalActive}
          setActive={setModalActive}
          id={currentIngredientId}
        >
          <IngredientDetails itemData={ingridients} itemId={currentIngredientId} />
        </Modal>
      )}
    </div>
  );
}
BurgerIngridient.propTypes = {
  type: PropTypes.string.isRequired,
};
export default BurgerIngridient;
