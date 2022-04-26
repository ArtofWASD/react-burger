import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeader from "../components/app-header/app-header";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { postRegisterForm } from "../services/reducers/auth";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const registerForm = {
    name: name,
    email: email,
    password: password,
  };

  function registerHandler(e) {
    e.preventDefault();
    dispatch(postRegisterForm(registerForm));
    setName('');
    setEmail('');
    setPassword('');
  }

  return (
    <>
      <AppHeader />
      <div className="grid justify-center mt-48">
        <p className={`${styles.font} text-center text-2xl`}>Зарегистрироваться</p>
        <form action="" className="grid gap-6 justify-items-center mt-6">
          <Input
            placeholder="Имя"
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
          />
          <Input
            placeholder="E-mail"
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
          <Input
            placeholder="Пароль"
            icon="ShowIcon"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
          <Button
            onClick={(e) => {
              registerHandler(e);
            }}
          >
            <p>Зарегистрироваться</p>
          </Button>
        </form>
      </div>
      <p className={`${styles.font_grey} text-center flex justify-center gap-2 py-4 mt-20`}>
        Уже зарегестрированы?{" "}
        <Link to="/login" className={styles.font_blue}>
          Войти
        </Link>
      </p>
    </>
  );
}
