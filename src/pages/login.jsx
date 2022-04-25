import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeader from "../components/app-header/app-header";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export default function LoginPage() {
  return (
    <>
      <AppHeader />
      <div className="grid justify-center justify-items-center mt-48">
        <p className={`${styles.font} text-center text-2xl`}>Войти</p>
        <form action="" className="grid gap-6 mt-6 justify-items-center">
          <Input placeholder="E-mail" type="email" size="default"/>
          <Input placeholder="Пароль" icon="TICons" />
          <Button className="flex justify-center mb-20 w-40">
            <p>Войти</p>
          </Button>
        </form>
      </div>
      <div className="mt-20">
        <p className={`${styles.font_grey} text-center flex justify-center gap-2`}>
          Вы - новый пользователь ?{" "}
          <Link to="/register" className={styles.font_blue}>
            Зарегистрироваться
          </Link>
        </p>
        <p className={`${styles.font_grey} text-center flex justify-center gap-2 py-4`}>
          Забыли пароль ?{" "}
          <Link to="/forgot-password" className={styles.font_blue}>
            Восстановить пароль
          </Link>
        </p>
      </div>
    </>
  );
}
