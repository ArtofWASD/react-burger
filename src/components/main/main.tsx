import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useAppSelector } from '../../utils/hook';
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";

export default function MainPage() {

  const ingridients = useAppSelector(state => state.getData);
  
  return (
    <div className="grid justify-items-center">
      <DndProvider backend={HTML5Backend}>
        {ingridients && (
          <main className="grid grid-cols-2 gap-16 mt-5 pb-12 absolute">
            <BurgerIngredients />
            <BurgerConstructor />
          </main>
        )}
      </DndProvider>
    </div>
  );
}
