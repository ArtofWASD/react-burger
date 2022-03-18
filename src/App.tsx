import React from 'react';
import './App.css';
import AppHeader from './components/AppHeader/AppHeader'
import BurgerConstructor from './components/BurgerConstructor/BurgerConstructor'
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients'


function App() {
  return (
    <div className="App">
      <AppHeader/>
      <section>
        <BurgerConstructor/>
        <BurgerIngredients/>
      </section>
    </div>
  );
}

export default App;
