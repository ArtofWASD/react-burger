import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-constructor-item.module.css'
import {deleteIngridientItem,} from "../../services/reducers/get-data";
import { useDispatch,} from "react-redux";
import {useRef} from 'react';
import { useDrag, useDrop } from "react-dnd";
function BurgerConstructorItem ({item, position, type, isLocked, isDragged, index, moveCard}){
    const dispatch = useDispatch();
    const ref = useRef(null);

    const [{ opacity }, drag] = useDrag({
      type: "ingredient",
      item: { ...item },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    });
    
    return(
        <section className="flex items-center py-2 pr-3" ref={drag} style={{opacity}}>
          <div className={isDragged ? styles.visible : styles.hidden}>
            <DragIcon type="primary" />
          </div>
          <ConstructorElement
            type={type}
            isLocked={isLocked}
            text={`${item.name} ${position}`}
            price={item.price}
            thumbnail={item.image}
            handleClose={()=>dispatch(deleteIngridientItem(item))}
          />
        </section>
    )
}
export default BurgerConstructorItem