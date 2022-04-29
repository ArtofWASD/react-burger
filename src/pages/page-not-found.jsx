import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import errorImg from "../images/404-error-min.png"
export default function PageNotFoundPage() {
  return (
    <>
      <div className="grid justify-center mt-32">
        <p className={`${styles.font} text-center text-2xl`}>Упс, похоже старница не найдена !</p>
        <img src={errorImg} alt='error'/>
        <p className={`${styles.font_grey} text-center flex justify-center gap-2 py-4`}>
          Вернуться обратно ?{" "}
          <Link to="/" className={styles.font_blue}>
            Обратно
          </Link>
        </p>
      </div>
    </>
  );
}
