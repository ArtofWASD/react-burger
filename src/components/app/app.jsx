import { useState, useEffect } from "react";
import { fetchData } from "../../services/reducers/get-data";
import { useDispatch } from "react-redux";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';
import AppHeader from "../app-header/app-header";
import styles from "./app.module.css";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { getIngridients } from "../../utils/api" 

function App() {
  const [ingridients, setIngridients] = useState(null);
  const dispatch = useDispatch()
  
  useEffect(()=>{
    dispatch(fetchData())
  },[dispatch])

  useEffect(() => {
    getIngridients()
      .then(setIngridients)
      .catch((e) => console.error(e));
  }, []);

  return (
    <div className="grid justify-items-center">
      <header className={styles.header}>
        <AppHeader />
      </header>
      <DndProvider backend={HTML5Backend}>
        {ingridients && <main className="grid grid-cols-2 gap-16 pt-20 absolute">
          <BurgerIngredients/>
          <BurgerConstructor/>
        </main>}
      </DndProvider>
    </div>
  );
}

export default App;
