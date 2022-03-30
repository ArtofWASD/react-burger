import {useState, useContext} from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerContext } from "../../services/burger-context";
import Modal from "../modal/modal"
import IngredientDetails from '../ingredient-details/ingredient-details'
import styles from "./burger-ingredients.module.css";

function BurgerIngredients() {
  const data = useContext(BurgerContext)
  const [current, setCurrent] = useState("one");
  const [modalActive, setModalActive] = useState(false);
  const [currentIngredientId, setCurrentIngredientId] = useState()

  return (
    <section className="flex flex-col ">
      {/* Заголовок ингридиентов */}
      <div className="pt-10">
        <h1 className="text text_type_main-large">Соберите бургер</h1>
      </div>
      <div>
        {/* Табы ингридиентов*/}
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
          {/* Содержимое табов начало*/}
          <section className={styles.burgerIngredientsItems}>
            {/* Секция с булками */}
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
            {/* Секция с соусами */}
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
            {/* Секция с начинками */}
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
          {/* Содержимое табов конец*/}
        </div>
      </div>
      {/* Модальное окно с инофрмацией об ингридиенте */}
      {modalActive && <Modal active={modalActive} setActive={setModalActive} id={currentIngredientId}><IngredientDetails itemData={data} itemId={currentIngredientId}/></Modal>}
    </section>
  );
}

export default BurgerIngredients;
