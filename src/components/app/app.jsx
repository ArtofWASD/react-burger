import { useState, useEffect } from "react";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from "./app.module.css";
import { BurgerContext } from "../../utils/burger-context";

function App() {
  const url = `https://norma.nomoreparties.space/api/ingredients`;
  const [state, setState] = useState([]);
  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((data) => setState(data))
      .catch((e) => console.error(e));
  }, []);

  return (
    <div className="grid justify-items-center">
      <header className={styles.header}>
        <AppHeader />
      </header>
      <BurgerContext.Provider value={state.data}>
        {state.data &&<main className="grid grid-cols-2 gap-16 pt-20 absolute">
          <BurgerIngredients/>
          <BurgerConstructor/>
        </main>}
      </BurgerContext.Provider>
    </div>
  );
}

export default App;
