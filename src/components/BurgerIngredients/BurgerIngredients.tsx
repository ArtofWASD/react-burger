import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import data from "../../utils/data";
import "../BurgerIngredients/BurgerIngredients.css";
function BurgerIngredients() {

  const [current, setCurrent] = React.useState("one");
  return (
    <div className="burger-ingredients flex flex-col ">
      <section className="burger-ingredients_title pt-10">
        <h1 className="text text_type_main-large">Соберите бургер</h1>
      </section>
      <section className="burger-ingredients_tabs">
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
          <section className="burger-ingredients_items overflow-auto scroll-smooth pr-5">
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
                      className="relative flex flex-col justify-center items-center gap-2"
                      key={item._id}
                    >
                      <Counter count={1} size="default" />
                      <img
                        src={item.image_large}
                        alt={item.name}
                        style={{ width: 240 }}
                      />
                      <div className="flex items-center justify-center gap-2">
                        <p className="card_price">{item.price}</p>
                        <CurrencyIcon type="primary" />
                      </div>
                      <p className=" text-center text-base pt-2">{item.name}</p>
                    </div>
                  ))}
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
                      className="relative flex flex-col justify-center items-center gap-2"
                      key={item._id}
                    >
                      <Counter count={1} size="default" />
                      <img
                        src={item.image_large}
                        alt={item.name}
                        style={{ width: 240 }}
                      />
                      <div className="flex items-center justify-center gap-2">
                        <p className="card_price">{item.price}</p>
                        <CurrencyIcon type="primary" />
                      </div>
                      <p className=" text-center text-base pt-2">{item.name}</p>
                    </div>
                  ))}
              </div>
            </div>
            <div className="flex flex-col py-4">
              <div>
                <p className="text-3xl py-4">Начинка</p>
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
                      className="relative flex flex-col justify-center items-center gap-2"
                      key={item._id}
                    >
                      <Counter count={1} size="default" />
                      <img
                        src={item.image_large}
                        alt={item.name}
                        style={{ width: 240 }}
                      />
                      <div className="flex items-center justify-center gap-2">
                        <p className="card_price">{item.price}</p>
                        <CurrencyIcon type="primary" />
                      </div>
                      <p className=" text-center text-base pt-2">{item.name}</p>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
export default BurgerIngredients;
