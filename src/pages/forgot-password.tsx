import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { postResetForm } from "../services/reducers/reset-reducer/reset";
import styles from "./styles.module.css";
import { useAppDispatch } from "../utils/hook";

type TResetForm ={
  email:string
}

export default function ForgotPasswordPage() {
  
  const [emailValue, setEmailValue] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation()

  const resetForm:TResetForm = {
    email: emailValue,
  };

  function postValue(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(postResetForm(resetForm));
    navigate("/reset-password", { replace: true, state:location});

  }

  return (
    <>
      <div className="grid justify-center mt-48">
        <p className={`${styles.font} text-center text-2xl`}>Восстановление пароля</p>
        <form action="submit" onSubmit={(e) => {postValue(e)}} className="grid gap-6 justify-items-center mt-6">
          <Input
            placeholder="Укажите e-mail"
            type="email"
            onChange={(e) => {
              setEmailValue(e.target.value);
            }}
            value={emailValue}
          />
          <Button>
            <p>Восстановить</p>
          </Button>
        </form>
        <p className={`${styles.font_grey} text-center flex justify-center gap-2 py-4 mt-20`}>
          Вспомнили пароль ?
          <Link to="/login" className={styles.font_blue}>
            Войти
          </Link>
        </p>
      </div>
    </>
  );
}
