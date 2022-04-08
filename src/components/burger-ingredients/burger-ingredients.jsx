import { useState, useRef, useEffect } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngridientsCategory from "../ingridients-category/ingridients-category";
import BurgerIngridientList from "../burger-ingridient-list/burger-ingridient-list";
import styles from "./burger-ingredients.module.css";

function BurgerIngredients() {
  const [current, setCurrent] = useState("one");

  const bun = useRef();
  const sauce = useRef();
  const main = useRef();
  const ingridientsList = useRef();
  const bunList = useRef();
  const sauceList = useRef();
  const mainList = useRef();

  const handlerTabScrollUp = (item) => {
    item.current.scrollIntoView({ block: "start", behavior: "smooth" });
  };
  useEffect(() => {
   if (ingridientsList.current) {

  // console.log(`булки ${bunList.current.scrollHeight }`);
  // console.log(`соусы ${sauceList.current.scrollHeight }`);
  // console.log(`основное ${mainList.current.scrollHeight }`);
     ingridientsList.current.addEventListener("scroll", ()=>{
      const distance = ingridientsList.current.scrollTop
      console.log(distance);
      const bunsHeight = Number(bunList.current.scrollHeight);
      const sauceHeight = Number(sauceList.current.scrollHeight);
      const mainHeight = Number(mainList.current.scrollHeight);

        if(distance > bunsHeight){
          console.log('Соусы');
        }else if(distance >= sauceHeight){
          console.log('мясо');
        }else if(distance >= bunsHeight){
          console.log('булки');
        }
      })
   }
  })
  return (
    <section className="flex flex-col ">
      {/* Заголовок ингридиентов */}
      <div className="pt-10">
        <h1 className="text text_type_main-large">Соберите бургер</h1>
      </div>
      <div>
        {/* Табы ингридиентов начало*/}
        <div className="grid grid-cols-3 justify-around py-4">
          <div onClick={() => handlerTabScrollUp(bun)}>
            <Tab value="one" active={current === "one"} onClick={setCurrent}>
              Булки
            </Tab>
          </div>
          <div onClick={() => handlerTabScrollUp(sauce)}>
            <Tab value="two" active={current === "two"} onClick={setCurrent}>
              Соусы
            </Tab>
          </div>
          <div onClick={() => handlerTabScrollUp(main)}>
            <Tab value="three" active={current === "three"} onClick={setCurrent}>
              Начинки
            </Tab>
          </div>
        </div>
        {/* Табы ингридиентов конец*/}
        {/* Ингридиенты начало*/}
        <div className={styles.burgerIngredientsItems} ref={ingridientsList}>
          <IngridientsCategory title="Булки" ref={bun}>
            <BurgerIngridientList type="bun" ref={bunList}/>
          </IngridientsCategory>
          <IngridientsCategory title="Соусы" ref={sauce}>
            <BurgerIngridientList type="sauce" ref={sauceList}/>
          </IngridientsCategory>
          <IngridientsCategory title="Начинка" ref={main}>
            <BurgerIngridientList type="main" ref={mainList}/>
          </IngridientsCategory>
        </div>
        {/* Ингридиенты конец*/}
      </div>
    </section>
  );
}

export default BurgerIngredients;
