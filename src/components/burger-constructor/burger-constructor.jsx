import { useState, useContext, useReducer, useEffect } from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerContext } from "../../services/burger-context";
import { postOrder } from "../../utils/api";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import styles from "./burger-constructor.module.css";
import BurgerConstructorItem from "../burger-constructor-item/burger-constructor-item";

function BurgerConstructor() {
  const data = useContext(BurgerContext);
  const [modalActive, setModalActive] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const bun = data[0];
  const ingredients = data.filter((item) => item.type !== "bun");
  const initialState = { totalPrice: 0 };
  // сумма заказа на основе корзины
  const summTotal = ingredients.reduce(
    (sum, ingredient) => sum + ingredient.price,
    bun.price * 2
  );

  function reducer(state, action) {
    switch (action.type) {
      case "addIngridient":
        return {
          totalPrice: state.totalPrice + 1,
        };
      case "deleteIngridient":
        return {
          totalPrice: state.totalPrice - 1,
        };
      case "totalPrice":
        return {
          totalPrice: summTotal,
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

  // Пост запрос с ингридиентами
  const order = {
    bun: [],
    ingredients: ingredients.map((item) => item._id),
  };

  function getOrder() {
    setOrderId(undefined);
    postOrder(order).then(setOrderId);
  }

  return (
    <section className="burger-constructor pt-24">
      {/* Конструктор бургеров начало*/}
      <section className="flex flex-col items-center ">
        {/* Верхняя булка начало*/}
        <BurgerConstructorItem
          item={bun}
          position="(верх)"
          type="top"
          isLocked={true}
          isDragged={false}
          itemKey={bun._id}
        />
        {/* Верхняя булка конец */}

        {/* Тело бургера начало */}
        <section className={styles.burgerConstructorItems}>
          {ingredients.map((item) => (
            <BurgerConstructorItem
              item={item}
              position=""
              type="undefined"
              isLocked={false}
              isDragged={true}
              itemKey={item._id}
            />
          ))}
        </section>
        {/* Тело бургера конец */}

        {/* Нижняя булка начало */}
        <BurgerConstructorItem
          item={bun}
          position="(низ)"
          type="bottom"
          isLocked={true}
          isDragged={false}
          itemKey={bun.length}
        />
        {/* Нижняя булка конец */}
      </section>
      {/* Конструктор бургеров конец*/}

      {/* Нижний блок конструктора бургера начало */}
      <div className="burger-constructor_total flex justify-end items-center pt-10 pr-12 gap-2">
        {/* Цена бургера */}
        <p className={styles.burgerConstructorPrice}>{total.totalPrice}</p>
        <span className="pr-8">
          <CurrencyIcon type="primary" />
        </span>
        {/* Кнопка "Оформить заказ"*/}
        <span onClick={getOrder}>
          <Button
            type="primary"
            size="medium"
            onClick={() => setModalActive(true)}
          >
            <p className="text-base">Оформить заказ</p>
          </Button>
        </span>
      </div>
      {/* Нижний блок конструктора бургера конец */}
      {/* Модальное окно с номером заказа */}
      {modalActive && (
        <Modal active={modalActive} setActive={setModalActive}>
          <OrderDetails orderId={orderId} />
        </Modal>
      )}
    </section>
  );
}

export default BurgerConstructor;
