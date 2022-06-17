import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { postRegisterForm } from "../services/reducers/auth-reducer/auth";
import styles from "./styles.module.css";
import { useAppDispatch } from "../utils/hook";

type TRegisterForm = {
  name: string;
  email: string;
  password: string;
}
export default function RegisterPage() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const registerForm:TRegisterForm = {
    name: name,
    email: email,
    password: password,
  };

  function registerHandler(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(postRegisterForm(registerForm));
    setName('');
    setEmail('');
    setPassword('');
    navigate("/", { replace: true });
  }

  return (
    <>
      <div className="grid justify-center mt-48">
        <p className={`${styles.font} text-center text-2xl`}>Зарегистрироваться</p>
        <form action="submit" onSubmit={(e)=>{registerHandler(e)}} className="grid gap-6 justify-items-center mt-6">
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
          <Button>
            Зарегистрироваться
          </Button>
        </form>
      </div>
      <p className={`${styles.font_grey} text-center flex justify-center gap-2 py-4 mt-20`}>
        Уже зарегестрированы?
        <Link to="/login" className={styles.font_blue}>
          Войти
        </Link>
      </p>
    </>
  );
}
