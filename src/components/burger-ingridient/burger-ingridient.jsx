import { useState, useEffect } from "react";
import { fetchData, filterData } from "../../services/reducers/get-data";
import { useDispatch, useSelector } from "react-redux";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import styles from "./burger-ingridient.module.css";

function BurgerIngridient({ type }) {
  const [modalActive, setModalActive] = useState(false);
  const [currentIngredientId, setCurrentIngredientId] = useState();
  const dispatch = useDispatch();
  const data = useSelector(state=>state.getData.data)

  const ingridientType = data.filter((item) => {
    if (item.type === type) {
      return item;
    }
  });
  
  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch]);

  return (
    <div className="grid grid-cols-2 gap-3">
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
          <IngredientDetails itemData={data} itemId={currentIngredientId} />
        </Modal>
      )}
    </div>
  );
}
BurgerIngridient.propTypes = {
  type: PropTypes.string.isRequired,
};
export default BurgerIngridient;
