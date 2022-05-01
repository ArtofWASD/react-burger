import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { postResetPassword } from "../services/reducers/reset";

import styles from "./styles.module.css";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [validationCode, setValidationCode] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  
  const resetForm = {
    password: password,
    token: validationCode,
  };

  function resetHandler() {
    dispatch(postResetPassword(resetForm));
    navigate("/", { replace: true });
  }
  return (
    <>
      {location.state && location.state.pathname === "/forgot-password" ? (
        <>
        <div className="grid justify-center mt-48">
        <p className={`${styles.font} text-center text-2xl`}>Восстановление пароля</p>
        <form action="submit" onSubmit={() => resetHandler()} className="grid gap-6 justify-items-center mt-6">
          <Input placeholder="Введите новый пароль" type="password" icon="ShowIcon" onChange={(e) => setPassword(e.target.value)} value={password} />
          <Input placeholder="Введите код из письма" type="text" onChange={(e) => setValidationCode(e.target.value)} value={validationCode} />
            <Button>
              <p>Сохранить</p>
            </Button>
        </form>
      </div>
      <p className={`${styles.font_grey} text-center flex justify-center gap-2 py-4 mt-20`}>
        Вспомнили пароль?{" "}
        <Link to="/login" className={styles.font_blue}>
          Войти
        </Link>
      </p>
      </>
      ):(
        <Navigate to="/" replace={true}/>
      )}
    </>
  );
}
