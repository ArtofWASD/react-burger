import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";


import data from "../../utils/data";
function BurgerIngredients() {
  const Card = () => {
    return (
      <>
        {data.map((item) => (
          <div className={item.type} key={item._id}>
              <img src={item.image_large} alt={item.name} />
              <div className="flex items-center justify-center gap-2">
                  <p className="card_price">{item.price}</p>
                  <CurrencyIcon type="primary" />
              </div>
              <p className="pt-2">{item.name}</p>
          </div>
        ))}
      </>
    );
  };

  const [current, setCurrent] = React.useState("one");
  return (
    <div className="flex flex-col">
      <section className="pt-10">
        <h1 className="text text_type_main-large">Соберите бургер</h1>
      </section>
      <section className="flex pt-5">
        <Tab value="one" active={current === "one"} onClick={setCurrent}>
          <p>Булки</p>
          <Card/>
        </Tab>
        <Tab value="two" active={current === "two"} onClick={setCurrent}>
          <p>Соусы</p>
        </Tab>
        <Tab value="three" active={current === "three"} onClick={setCurrent}>
          <p>Начинки</p>
        </Tab>
      </section>
    </div>
  );
}

export default BurgerIngredients;
