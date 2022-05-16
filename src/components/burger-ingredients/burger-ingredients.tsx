import React from "react";
import { useState, useRef, useEffect, FC } from "react";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngridientsCategory from "../ingridients-category/ingridients-category";
import BurgerIngridientList from "../burger-ingridient-list/burger-ingridient-list";
import styles from "./burger-ingredients.module.css";

const BurgerIngredients: FC = () => {
  const [current, setCurrent] = useState<string>("one");

  const bun = useRef<HTMLDivElement>(null);
  const sauce = useRef<HTMLDivElement>(null);
  const main = useRef<HTMLDivElement>(null);
  const ingridientsList = useRef<HTMLDivElement>(null);

  const handlerTabScrollUp = (item: React.RefObject<HTMLDivElement>) => {
    if (item.current !== null) {
      item.current.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (ingridientsList.current) {
      ingridientsList.current.addEventListener("scroll", () => {
        const distance = ingridientsList.current !== null ? ingridientsList.current.scrollTop : null;
        const bunsHeight = Number(bun.current !== null ? bun.current.offsetHeight : null);
        const sauceHeight = Number(sauce.current !== null ? sauce.current.offsetHeight : null);
        if (distance !== null && distance < bunsHeight) {
          setCurrent("one");
        } else if (distance !== null && distance < bunsHeight + sauceHeight) {
          setCurrent("two");
        } else if (distance !== null && distance > bunsHeight + sauceHeight) {
          setCurrent("three");
        }
      });
    }
  });
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
            <BurgerIngridientList type="bun" />
          </IngridientsCategory>
          <IngridientsCategory title="Соусы" ref={sauce}>
            <BurgerIngridientList type="sauce" />
          </IngridientsCategory>
          <IngridientsCategory title="Начинка" ref={main}>
            <BurgerIngridientList type="main" />
          </IngridientsCategory>
        </div>
        {/* Ингридиенты конец*/}
      </div>
    </section>
  );
};

export default BurgerIngredients;
