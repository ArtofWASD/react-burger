import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-constructor-item.module.css'

function BurgerConstructorItem ({item, position, type, isLocked, isDragged, itemKey}){
    return(
        <section className="flex items-center py-2 pr-3" key={itemKey}>
          <div className={isDragged ? styles.visible : styles.hidden}>
            <DragIcon type="primary" />
          </div>
          <ConstructorElement
            type={type}
            isLocked={isLocked}
            text={`${item.name} ${position}`}
            price={item.price}
            thumbnail={item.image}
          />
        </section>
    )
}
export default BurgerConstructorItem