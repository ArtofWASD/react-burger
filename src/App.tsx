import React from "react";
import "./App.css";
import AppHeader from "./components/AppHeader/AppHeader";
import BurgerConstructor from "./components/BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "./components/BurgerIngredients/BurgerIngredients";

function App() {
  return (
    <div className="App">
      <header>
        <AppHeader />
      </header>
      <main className="flex justify-center gap-24">
      <BurgerIngredients />
      <BurgerConstructor />
      </main>
    </div>
  );
}

export default App;
