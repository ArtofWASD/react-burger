import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor-item.module.css";
import { deleteIngridientItem } from "../../services/reducers/get-data";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
function BurgerConstructorItem({ item, position, type, isLocked, isDragged, index, moveCard }) {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: 'component',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'component',
    item: () => ({ id: item.id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  if (item.type !== 'bun') drag(drop(ref));
  const preventDefault = (e) => e.preventDefault();
  drag(drop(ref));
  
  return (
    <section className="flex items-center py-2 pr-3" ref={ref} style={{ opacity }} data-handler-id={handlerId } onDrop={preventDefault}>
      <div className={isDragged ? styles.visible : styles.hidden}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        type={type}
        isLocked={isLocked}
        text={`${item.name} ${position}`}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => dispatch(deleteIngridientItem(item))}
      />
    </section>
  );
}
export default BurgerConstructorItem;
