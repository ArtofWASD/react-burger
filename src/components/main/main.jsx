import AppHeader from "../app-header/app-header";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchData } from "../../services/reducers/get-data";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";

export default function MainPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  const ingridients = useSelector((state) => state.getData);
  return (
    <div className="grid justify-items-center">
        <AppHeader />
      <DndProvider backend={HTML5Backend}>
        {ingridients && (
          <main className="grid grid-cols-2 gap-16 mt-20 absolute">
            <BurgerIngredients />
            <BurgerConstructor />
          </main>
        )}
      </DndProvider>
    </div>
  );
}
