import React, { useState, useEffect } from "react";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from "./app.module.css"

function App() {
  const url = `https://norma.nomoreparties.space/api/ingredients`;
  const [state, setState] = useState([]);
  useEffect(() => {
    fetch(url)
      .then(res=>res.json())
      .then(data=>setState(data))
      .catch((e) => console.error(e))
  }, [url]);

  return (
    <div className="App grid justify-items-center">
      <header className={styles.header}>
        <AppHeader />
      </header>
      {state.data &&
      <main className="burger-main grid grid-cols-2 pt-20 absolute gap-16"> 
        <BurgerIngredients data={state.data} />
        <BurgerConstructor data={state.data} />
      </main>}
      <div id="modal" className="relative grid justify-center"></div>
    </div>
  );
}

export default App;
