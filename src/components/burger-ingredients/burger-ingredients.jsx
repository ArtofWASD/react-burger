import {useState} from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngridientsCategory from '../ingridients-category/ingridients-category'
import BurgerIngridient from "../burger-ingridient/burger-ingridient"
import styles from "./burger-ingredients.module.css"

function BurgerIngredients() {
  const [current, setCurrent] = useState("one");
  return (
    <section className="flex flex-col ">
      {/* Заголовок ингридиентов */}
      <div className="pt-10">
        <h1 className="text text_type_main-large">Соберите бургер</h1>
      </div>
      <div>
        {/* Табы ингридиентов начало*/}
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
        {/* Табы ингридиентов конец*/}
        {/* Ингридиенты начало*/}
        <div className={styles.burgerIngredientsItems}>
        <IngridientsCategory title='Булки'><BurgerIngridient type='bun'/></IngridientsCategory>
        <IngridientsCategory title='Соусы'><BurgerIngridient type='sauce'/></IngridientsCategory>
        <IngridientsCategory title='Начинка'><BurgerIngridient type='main'/></IngridientsCategory>
        </div>
        {/* Ингридиенты конец*/}
      </div>      
    </section>
  );
}

export default BurgerIngredients;
