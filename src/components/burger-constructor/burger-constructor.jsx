import { useState, useCallback } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { postOrder, addIngridientItem, addBunItem, updateIngridient } from "../../services/reducers/get-data";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import styles from "./burger-constructor.module.css";
import BurgerConstructorItem from "../burger-constructor-item/burger-constructor-item";

function BurgerConstructor() {
  const [modalActive, setModalActive] = useState(false);
  const { ingridients, constructor, total } = useSelector((state) => state.getData);
  const dispatch = useDispatch();
  const constructorIngredients = ingridients.filter((item) => item.type !== "bun");

  const order = {
    ingredients: constructorIngredients.map((item) => item._id),
  };

  const [{ isHover }, dropTargerRef] = useDrop({
    accept: "ingredient",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(data) {
      const newIngredient = {
        ...data,
        _uniqueId: uuidv4(),
      };
      if (data.type === "bun") {
        dispatch(addBunItem(newIngredient));
      } else {
        dispatch(addIngridientItem(newIngredient));
      }
    },
  });

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    const dragCard = constructor.ingridients[dragIndex];
    const newCards = [...constructor.ingridients]
    newCards.splice(dragIndex, 1)
    newCards.splice(hoverIndex, 0, dragCard)
    dispatch(updateIngridient(newCards))
  }, [constructor.ingridients, dispatch]);

  return (
    <section className="pt-24">
      {/* Конструктор бургеров начало*/}
      <section className={`${isHover ? styles.onHover : ""} flex flex-col items-center h-5/6 justify-center `} ref={dropTargerRef}>
        {/* Верхняя булка начало*/}
        {constructor.buns.length > 0 &&
          constructor.buns.map((item) => (
            <BurgerConstructorItem item={item} position="(верх)" type="top" isLocked={true} isDragged={false} key={item._uniqueId} />
          ))}
        {/* Верхняя булка конец */}
        {/* Тело бургера начало */}
        <section className={styles.burgerConstructorItems}>
          {constructor.ingridients.map((item, index) => (
            <BurgerConstructorItem
              item={item}
              position=""
              type="undefined"
              isLocked={false}
              isDragged={true}
              key={item._uniqueId}
              index={index}
              moveCard={moveCard}
            />
          ))}
        </section>
        {/* Тело бургера конец */}
        {/* Нижняя булка начало */}
        {constructor.buns.length > 0 &&
          constructor.buns.map((item) => (
            <BurgerConstructorItem item={item} position="(низ)" type="bottom" isLocked={true} isDragged={false} key={item._uniqueId} />
          ))}
        {/* Нижняя булка конец */}
      </section>
      {/* Конструктор бургеров конец*/}
      {/* Нижний блок конструктора бургера начало */}
      <div className="burger-constructor_total flex justify-end items-center pt-10 pr-12 gap-2">
        {/* Цена бургера */}
        <p className={styles.burgerConstructorPrice}>{total}</p>
        <span className="pr-8">
          <CurrencyIcon type="primary" />
        </span>
        {/* Кнопка "Оформить заказ"*/}
        <span onClick={() => dispatch(postOrder(order))}>
          <Button type="primary" size="medium" onClick={() => setModalActive(true)}>
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
