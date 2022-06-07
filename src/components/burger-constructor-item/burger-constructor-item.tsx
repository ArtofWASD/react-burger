import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { deleteIngridientItem } from "../../services/reducers/get-data";
import { useRef, FC, DragEvent } from "react";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import styles from "./burger-constructor-item.module.css";
import { useAppDispatch } from "../../utils/hook";

type TBurgerConstructorItem = {
  item: {
    id: string;
    type: string;
    name: string;
    image: string;
    price: number;
  };
  isLocked: boolean;
  isDragged: boolean;
  position: string;
  type: "top" | "bottom" | undefined;
  index?: number | undefined;
  moveCard?: (dragIndex: number, hoverIndex: number | undefined) => void;
};

const BurgerConstructorItem: FC<TBurgerConstructorItem> = ({ item, position, type, isLocked, isDragged, index, moveCard }) => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: "component",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: any, monitor) {
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
      const clientOffset: XYCoord | null = monitor.getClientOffset();
      const hoverClientY : number| null = clientOffset !== null ? clientOffset.y - hoverBoundingRect.top : null;

      if (hoverClientY !== null && hoverIndex !== undefined && dragIndex < hoverIndex && hoverClientY< hoverMiddleY && hoverClientY) {
        return;
      }

      if (hoverClientY !== null && hoverIndex !== undefined && dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      if (moveCard !== undefined) {
        moveCard(dragIndex, hoverIndex);
      }

      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: "component",
    item: () => ({ id: item.id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  if (item.type !== "bun") drag(drop(ref));

  const preventDefault = (e: DragEvent<HTMLElement>) => e.preventDefault();

  return (
    <section className="flex items-center py-2 pr-3" ref={ref} style={{ opacity }} data-handler-id={handlerId} onDrop={preventDefault}>
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
};
export default BurgerConstructorItem;
