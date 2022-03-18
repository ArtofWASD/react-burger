import React from "react";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {
  return (
    <nav>
      <section>
        <BurgerIcon type="primary" />
        <p>Конструктор</p>
      </section>
      <section>
        <ListIcon type="secondary" />
        <p>Лента заказов</p>
      </section>
      <section>
        <Logo />
      </section>
      <section>
        <ProfileIcon type="secondary" />
        <p>Личный кабинет</p>
      </section>
    </nav>
  );
}

export default AppHeader;
