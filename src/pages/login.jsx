import { Logo, Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeader from "../components/app-header/app-header";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <>
      <AppHeader />
      <div className="grid justify-center">
        <Logo />
        <p className="text-center">Войти</p>
        <form action="" className="grid gap-4">
          <Input placeholder="E-mail" type="email" />
          <Input placeholder="Пароль" icon="TICons" type="password" />
          <Button>
            <p>Войти</p>
          </Button>
        </form>
      </div>
      <p className="text-center">
        Вы - новый пользователь ? <Link to="/register">Зарегистрироваться</Link>
      </p>
      <p className="text-center">
        Забыли пароль ? <Link to="/forgot-password">Восстановить пароль</Link>
      </p>
    </>
  );
}
