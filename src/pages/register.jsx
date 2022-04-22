import { Logo, Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeader from "../components/app-header/app-header";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  return (
    <>
      <AppHeader />
      <div className="grid justify-center">
        <Logo />
        <p className="text-center">Зарегистрироваться</p>
        <form action="" className="grid gap-4">
          <Input placeholder="Имя" type="text" />
          <Input placeholder="E-mail" type="email" />
          <Input placeholder="Пароль" icon="TICons" type="password" />
          <Button>
            <p>Зарегистрироваться</p>
          </Button>
        </form>
      </div>
      <p className="text-center">
        Уже зарегестрированы? <Link to="/login">Войти</Link>
      </p>
    </>
  );
}
