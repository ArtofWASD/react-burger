import { useState } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { postOrder } from "../../services/reducers/get-data";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import styles from "./burger-constructor.module.css";
import BurgerConstructorItem from "../burger-constructor-item/burger-constructor-item";

function BurgerConstructor() {
  const [modalActive, setModalActive] = useState(false);
  const { ingridients } = useSelector((state) => state.getData);
  const bun = ingridients[0];
  const constructorIngredients = ingridients.filter(
    (item) => item.type !== "bun"
  );
  const dispatch = useDispatch();

  const summTotal = constructorIngredients.reduce(
    (sum, ingredient) => sum + ingredient.price,
    bun.price * 2
  );

  const order = {
    ingredients: constructorIngredients.map((item) => item._id),
  };

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
          key={bun._id}
        />
        {/* Верхняя булка конец */}

        {/* Тело бургера начало */}
        <section className={styles.burgerConstructorItems}>
          {constructorIngredients.map((item) => (
            <BurgerConstructorItem
              item={item}
              position=""
              type="undefined"
              isLocked={false}
              isDragged={true}
              key={item._id}
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
          key={bun.length}
        />
        {/* Нижняя булка конец */}
      </section>
      {/* Конструктор бургеров конец*/}

      {/* Нижний блок конструктора бургера начало */}
      <div className="burger-constructor_total flex justify-end items-center pt-10 pr-12 gap-2">
        {/* Цена бургера */}
        <p className={styles.burgerConstructorPrice}>{summTotal}</p>
        <span className="pr-8">
          <CurrencyIcon type="primary" />
        </span>
        {/* Кнопка "Оформить заказ"*/}
        <span onClick={() => dispatch(postOrder(order))}>
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
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
}

export default BurgerConstructor;
