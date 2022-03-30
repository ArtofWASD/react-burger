import { useState, useEffect } from "react";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from "./app.module.css";
import { BurgerContext } from "../../services/burger-context";
import { Ingridients } from '../../utils/api'

function App() {
  const url = `${Ingridients}`;
  const [state, setState] = useState([null]);
  console.log(url);
  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (response.ok) {return response.json();
        }
        throw new Error('Не пришёл ответ от сервера');
      })
      .then((data) => {
        if (data.success) {
          return setState(data)
        }
        throw new Error('Данные не поступили в стейт');
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <div className="grid justify-items-center">
      <header className={styles.header}>
        <AppHeader />
      </header>
      <BurgerContext.Provider value={state.data}>
        {state.data && <main className="grid grid-cols-2 gap-16 pt-20 absolute">
          <BurgerIngredients/>
          <BurgerConstructor/>
        </main>}
      </BurgerContext.Provider>
    </div>
  );
}

export default App;
