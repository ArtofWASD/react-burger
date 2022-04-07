import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-constructor-item.module.css'
import {deleteIngridientItem,} from "../../services/reducers/get-data";
import { useDispatch } from "react-redux";
function BurgerConstructorItem ({item, position, type, isLocked, isDragged}){
    const dispatch = useDispatch();
    return(
        <section className="flex items-center py-2 pr-3">
          <div className={isDragged ? styles.visible : styles.hidden}>
            <DragIcon type="primary" />
          </div>
          <ConstructorElement
            type={type}
            isLocked={isLocked}
            text={`${item.name} ${position}`}
            price={item.price}
            thumbnail={item.image}
            handleClose={()=>dispatch(deleteIngridientItem(item._uniqueId))}
          />
        </section>
    )
}
export default BurgerConstructorItem