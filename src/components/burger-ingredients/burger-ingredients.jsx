import {useState, useEffect} from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal"

import styles from "./burger-ingredients.module.css";

function BurgerIngredients({ data }) {
  const [current, setCurrent] = useState("one");

  const [modalActive, setModalActive] = useState(false);

  const [state, setState] = useState({
    ingridientId:null
  })

  return (
    <section className="burger-ingredients flex flex-col ">
      <div className="burger-ingredients_title pt-10">
        <h1 className="text text_type_main-large">Соберите бургер</h1>
      </div>
      <div className="burger-ingredients_tabs">
        <div className="flex justify-around py-4">
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
                <p className="text-3xl py-4">Булки</p>
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
                      className="ingr-item relative gap-2"
                      key={item._id} onClick={()=>setModalActive(true)}
                    > 
                      <div className="flex flex-col items-center" onClick={()=>{setState({ingridientId:item._id})}}>
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
                  <Modal active={modalActive} setActive={setModalActive} id={state.ingridientId} data={data}/>
              </div>
            </div>
            <div className="flex flex-col py-4">
              <div>
                <p className="text-3xl py-4">Соусы</p>
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
                      className="ingr-item relative gap-2"
                      key={item._id} onClick={()=>setModalActive(true)}
                    > 
                      <div className="flex flex-col items-center" onClick={()=>{setState({ingridientId:item._id})}}>
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
                  <Modal active={modalActive} setActive={setModalActive} id={state.ingridientId} data={data}/>
              </div>
            </div>
            <div className="flex flex-col py-4">
              <div>
                <p className="text-3xl py-4">Начинки</p>
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
                      className="ingr-item relative gap-2"
                      key={item._id} onClick={()=>setModalActive(true)}
                    > 
                      <div className="flex flex-col items-center" onClick={()=>{setState({ingridientId:item._id})}}>
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
                  <Modal active={modalActive} setActive={setModalActive} id={state.ingridientId} data={data}/>
              </div>
            </div>
       
          </section>
        </div>
      </div>
    </section>
  );
}

export default BurgerIngredients;
