import React from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import Data from '../../utils/data'

function App() {
  return (
    <div className="App">
      <header>
        <AppHeader {...styles}/>
      </header>
      <main className="flex justify-center gap-32">
      <BurgerIngredients data={Data}/>
      <BurgerConstructor data={Data}/>
      </main>
    </div>
  );
}

export default App;
