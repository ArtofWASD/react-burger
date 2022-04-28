import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { LogIn } from "../services/reducers/auth";
import AppHeader from "../components/app-header/app-header";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const logInForm = {
    email: email,
    password: password,
  };

  function logIn() {
    dispatch(LogIn(logInForm));
    setPassword("");
    setEmail("");
  }
  return (
    <>
      <AppHeader />
      <div className="grid justify-center justify-items-center mt-48">
        <p className={`${styles.font} text-center text-2xl`}>Войти</p>
        <form
          action="submit"
          className="grid gap-6 mt-6 justify-items-center"
        >
          <Input placeholder="E-mail" type="email" onChange={(e) => setEmail(e.target.value)} value={email ? email : ""} />
          <Input placeholder="Пароль" type="password" icon="ShowIcon" onChange={(e) => setPassword(e.target.value)} value={password ? password : ""} />
          <Link to="/" onClick={() =>{logIn()}}>
            <Button className="flex justify-center mb-20 w-40">
              <p>Войти</p>
            </Button>
          </Link>
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
