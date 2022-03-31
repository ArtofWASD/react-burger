import { useState, useEffect } from "react";
import AppHeader from "../app-header/app-header";
import styles from "./app.module.css";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { BurgerContext } from "../../services/burger-context";
import { getIngridients } from "../../utils/api" 

function App() {
  const [ingridients, setIngridients] = useState(null);

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
      <BurgerContext.Provider value={ingridients}>
        {ingridients && <main className="grid grid-cols-2 gap-16 pt-20 absolute">
          <BurgerIngredients/>
          <BurgerConstructor/>
        </main>}
      </BurgerContext.Provider>
    </div>
  );
}

export default App;
