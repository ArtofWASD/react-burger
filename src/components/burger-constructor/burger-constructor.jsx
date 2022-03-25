import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./burger-constructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";

function BurgerConstructor({ data }) {
  const [modalActive, setModalActive] = useState(false);
  const firstArrElem = data[0];
  const latestArrElem = data[data.length - 1];
  const restArr = data.slice(1, data.length - 1);
  return (
    <section className="burger-constructor pt-24">
      <section className="flex flex-col items-center ">
        <section className="flex items-center py-2 pr-3" key={firstArrElem._id}>
          <div className="pr-2.5 opacity-0">
            <DragIcon type="primary" />
          </div>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={firstArrElem.price}
            thumbnail={firstArrElem.image}
          />
        </section>
        <section className={styles.burgerConstructorItems}>
          {restArr.map((item) => (
            <section className="flex items-center py-2 pr-3" key={item._id}>
              <div className="pr-2.5">
                <DragIcon type="primary" />
              </div>
              <ConstructorElement
                type={undefined}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </section>
          ))}
        </section>
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
            text="Краторная булка N-200i (низ)"
            price={firstArrElem.price}
            thumbnail={firstArrElem.image}
          />
        </section>
      </section>
      <div className="burger-constructor_total flex justify-end items-center pt-10 gap-2">
        <p className={styles.burgerConstructorPrice}>610</p>
        <span className="pr-8">
          <CurrencyIcon type="primary" />
        </span>
        <Button
          type="primary"
          size="medium"
          onClick={() => setModalActive(true)}
        >
          Нажми на меня
        </Button>
      </div>
      <Modal
        active={modalActive}
        setActive={setModalActive}
        isConstructor={true}
      />
    </section>
  );
}

BurgerConstructor.propType = {
  data: PropTypes.shape({
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
  }),
};

export default BurgerConstructor;
