import React from "react";
import './BurgerConstructor.css'
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import data from "../../utils/data";

function BurgerConstructor() {
  return (
    <section className="burger-constructor pt-24">
      <div className="burger-constructor_items flex flex-col gap-3 overflow-auto scroll-smooth">
        <section className="flex flex-col items-center ">
          {data.map((item) => (
            <section className="flex items-center py-2 pr-3">
              <div className="pr-2.5">
                <DragIcon type="primary" />
              </div>
              <ConstructorElement
                key={item._id}
                type={undefined}
                isLocked={true}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </section>
          ))}
        </section>
      </div>
      <div className="burger-constructor_total flex justify-end items-center pt-10">
        <p className="burger-constructor_price text text_type_main-medium pr-3">
          610
        </p>
        <span className="pr-10">
          <CurrencyIcon type="primary" />
        </span>
        <Button type="primary" size="medium">
          Нажми на меня
        </Button>
      </div>
    </section>
  );
}
export default BurgerConstructor;
