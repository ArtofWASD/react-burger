import {useState, useContext} from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal"
import PropTypes from 'prop-types';
import IngredientDetails from '../ingredient-details/ingredient-details'
import styles from "./burger-ingredients.module.css";
import { BurgerContext } from "../../utils/burger-context";

function BurgerIngredients() {
  const data = useContext(BurgerContext)
  const [current, setCurrent] = useState("one");

  const [modalActive, setModalActive] = useState(false);

  const [currentIngredientId, setCurrentIngredientId] = useState()

  return (
    <section className="flex flex-col ">
      <div className="pt-10">
        <h1 className="text text_type_main-large">Соберите бургер</h1>
      </div>
      <div>
        <div className="grid grid-cols-3 justify-around py-4">
          <Tab value="one" active={current === "one"} onClick={setCurrent}>
            Булки
          </Tab>
          <Tab value="two" active={current === "two"} onClick={setCurrent}>
            Соусы
          </Tab>
          <Tab value="three" active={current === "three"} onClick={setCurrent}>
            Начинки
          </Tab>
        </div>
        <div>
          <section className={styles.burgerIngredientsItems}>
            <div className="flex flex-col py-4">
              <div>
                <p className="text-2xl py-4">Булки</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {data
                  .filter((item) => {
                    if (item.type === "bun") {
                      const result = item;
                      return result;
                    }
                  })
                  .map((item) => (
                    <div
                      className="relative gap-2"
                      key={item._id} onClick={()=>setModalActive(true)}
                    > 
                      <div className="flex flex-col items-center" onClick={()=>{setCurrentIngredientId(item._id)}}>
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
                  
              </div>
            </div>
            <div className="flex flex-col py-4">
              <div>
                <p className="text-2xl py-4">Соусы</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {data
                  .filter((item) => {
                    if (item.type === "sauce") {
                      const result = item;
                      return result;
                    }
                  })
                  .map((item) => (
                    <div
                      className="relative gap-2"
                      key={item._id} onClick={()=>setModalActive(true)}
                    > 
                      <div className="flex flex-col items-center" onClick={()=>{setCurrentIngredientId(item._id)}}>
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
              </div>
            </div>
            <div className="flex flex-col py-4">
              <div>
                <p className="text-2xl py-4">Начинки</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {data
                  .filter((item) => {
                    if (item.type === "main") {
                      const result = item;
                      return result;
                    }
                  })
                  .map((item) => (
                    <div
                      className="relative gap-2"
                      key={item._id} onClick={()=>setModalActive(true)}
                    > 
                      <div className="flex flex-col items-center" onClick={()=>{setCurrentIngredientId(item._id)}}>
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
              </div>
            </div>
          </section>
        </div>
      </div>
      {modalActive && <Modal active={modalActive} setActive={setModalActive} id={currentIngredientId}><IngredientDetails itemData={data} itemId={currentIngredientId}/></Modal>}
    </section>
  );
}
BurgerIngredients.propTypes={
  data: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
  }))
}

export default BurgerIngredients;
