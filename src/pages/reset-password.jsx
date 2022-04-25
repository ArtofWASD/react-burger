import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeader from "../components/app-header/app-header";
import { Link } from "react-router-dom";
import styles from "./styles.module.css"

export default function ResetPasswordPage() {
  return (
    <>
      <AppHeader />
      <div className="grid justify-center mt-48">
        <p className={`${styles.font} text-center text-2xl`}>Восстановление пароля</p>
        <form action="" className="grid gap-6 justify-items-center mt-6">
          <Input placeholder="Введите новый пароль" type="text" icon='ShowIcon'/>
          <Input placeholder="Введите код из письма" type="email"/>
          <Button>
            <p>Сохранить</p>
          </Button>
        </form>
      </div>
      <p className={`${styles.font_grey} text-center flex justify-center gap-2 py-4 mt-20`}>
        Вспомнили пароль? <Link to="/login" className={styles.font_blue}>Войти</Link>
      </p>
    </>
  )
}