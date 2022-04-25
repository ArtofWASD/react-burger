import AppHeader from "../components/app-header/app-header";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export default function PageNotFoundPage() {
  return (
    <>
      <AppHeader />
      <div className="grid justify-center mt-48">
        <p className={`${styles.font} text-center text-2xl`}>Упс, похоже старница не найдена !</p>
        <p className={`${styles.font_grey} text-center flex justify-center gap-2 py-4 mt-20`}>
          Вернуться обратно ?{" "}
          <Link to="/" className={styles.font_blue}>
            Обратно
          </Link>
        </p>
      </div>
    </>
  );
}
