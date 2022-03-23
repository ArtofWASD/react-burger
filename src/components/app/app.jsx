import React, { useState, useEffect } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";

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
    <div className="App" styles={styles}>
      <header>
        <AppHeader />
      </header>
      {state.data &&
      <main className="flex justify-center gap-32"> 
        <BurgerIngredients data={state.data} />
        <BurgerConstructor data={state.data} />
      </main>}
    </div>
  );
}

export default App;
