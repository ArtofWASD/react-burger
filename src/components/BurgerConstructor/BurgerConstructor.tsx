import React from "react";
import "./BurgerConstructor.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import data from "../../utils/data";

function BurgerConstructor() {
  const firstArrElem = data[0];
  const latestArrElem = data[data.length - 1];
  const restArr = data.slice(1, data.length - 1);
  return (
    <section className="burger-constructor pt-24">
      <div className="burger-constructor_items flex flex-col gap-3 overflow-auto scroll-smooth">
        <section className="flex flex-col items-center ">
          <section
            className="flex items-center py-2 pr-3"
            key={firstArrElem._id}
          >
            <div className="pr-2.5 opacity-0">
              <DragIcon type="primary" />
            </div>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={firstArrElem.name}
              price={firstArrElem.price}
              thumbnail={firstArrElem.image}
            />
          </section>
          {restArr.map((item) => (
            <section className="flex items-center py-2 pr-3" key={item._id}>
              <div className="pr-2.5">
                <DragIcon type="primary" />
              </div>
              <ConstructorElement
                type={undefined}
                isLocked={true}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </section>
          ))}
          <section
            className="flex items-center py-2 pr-3"
            key={latestArrElem._id}
          >
            <div className="pr-2.5 opacity-0">
              <DragIcon type="primary" />
            </div>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={latestArrElem.name}
              price={latestArrElem.price}
              thumbnail={latestArrElem.image}
            />
          </section>
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
