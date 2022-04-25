import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeader from "../components/app-header/app-header";
import { Link } from "react-router-dom";
import styles from "./styles.module.css"

export default function RegisterPage() {
  return (
    <>
      <AppHeader />
      <div className="grid justify-center mt-48">
        <p className={`${styles.font} text-center text-2xl`}>Зарегистрироваться</p>
        <form action="" className="grid gap-6 justify-items-center mt-6">
          <Input placeholder="Имя" type="text"/>
          <Input placeholder="E-mail" type="email"/>
          <Input placeholder="Пароль" icon='ShowIcon' type="password"/>
          <Button>
            <p>Зарегистрироваться</p>
          </Button>
        </form>
      </div>
      <p className={`${styles.font_grey} text-center flex justify-center gap-2 py-4 mt-20`}>
        Уже зарегестрированы? <Link to="/login" className={styles.font_blue}>Войти</Link>
      </p>
    </>
  );
}
