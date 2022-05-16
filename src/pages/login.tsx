import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../services/reducers/login";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

type TLogInForm ={
  email:string;
  password:string;
}

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logInForm:TLogInForm = {
    email: email,
    password: password,
  };

  function logInHandler(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(logIn(logInForm));
    navigate("/", { replace: true });
  }
  return (
    <>
      <div className="grid justify-center justify-items-center mt-48">
        <p className={`${styles.font} text-center text-2xl`}>Войти</p>
        <form
          action="submit"
          onSubmit={(e) => {
            logInHandler(e);
          }}
          className="grid gap-6 mt-6 justify-items-center"
        >
          <Input placeholder="E-mail" type="email" onChange={(e) => setEmail(e.target.value)} value={email ? email : ""} />
          <Input
            placeholder="Пароль"
            type="password"
            icon="ShowIcon"
            onChange={(e) => setPassword(e.target.value)}
            value={password ? password : ""}
          />
          <Button>Войти</Button>
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
