import { useState, useContext, useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./burger-constructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { BurgerContext } from "../../utils/burger-context";

function BurgerConstructor() {
  const data = useContext(BurgerContext);
  const [modalActive, setModalActive] = useState(false);
  const firstArrElem = data[0];
  const latestArrElem = data[data.length - 1];
  const restArr = data.slice(1, data.length - 1);
  const initialState = { totalPrice: 0 };

  const summTotal = restArr
    .map((item) => {
      return item.price;
    })
    .reduce((sum, current) => {
      return sum + current;
    });

  function reducer(state, action) {
    switch (action.type) {
      case "addIngridient":
        return{
          totalPrice: state.totalPrice + 1
        };
      case "deleteIngridient":
        return{
          totalPrice: state.totalPrice - 1 
        };
      case "totalPrice":
        return {
          totalPrice: summTotal + firstArrElem.price + latestArrElem.price,
        };
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  }

  const [total, dispatchTotal] = useReducer(reducer, initialState);
  function totalPriceShow() {
    dispatchTotal({ type: "totalPrice" });
  }

  useEffect(() => {
    totalPriceShow();
  }, []);

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
            text={`${firstArrElem.name} (низ)`}
            price={latestArrElem.price}
            thumbnail={firstArrElem.image}
          />
        </section>
      </section>
      <div className="burger-constructor_total flex justify-end items-center pt-10 pr-12 gap-2">
        <p className={styles.burgerConstructorPrice}>{total.totalPrice}</p>
        <span className="pr-8">
          <CurrencyIcon type="primary" />
        </span>
        <Button
          type="primary"
          size="medium"
          onClick={() => setModalActive(true)}
        >
          <p className="text-base">Оформить заказ</p>
        </Button>
      </div>
      {modalActive && (
        <Modal active={modalActive} setActive={setModalActive}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ),
};

export default BurgerConstructor;
