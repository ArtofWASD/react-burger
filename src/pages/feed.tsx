import styles from './styles.module.css'

export default function FeedPage() {
  return (
    <div className="grid grid-cols-2 justify-center mx-72 pt-10">
      <div>
        <div className={`${styles.font} text-4xl`}>Лента заказов</div>
      </div>
      <div>
        <div className="grid grid-cols-2">
          <div>
              <div className={`${styles.font} text-2xl pb-5`}>Готовы:</div>
              <ul>
                  <li className={`${styles.number_green} text-2xl`}>034544</li>
                  <li className={`${styles.number_green} text-2xl`}>034543</li>
                  <li className={`${styles.number_green} text-2xl`}>034545</li>
                  <li className={`${styles.number_green} text-2xl`}>034546</li>
                  <li className={`${styles.number_green} text-2xl`}>034547</li>
                  <li className={`${styles.number_green} text-2xl`}>034548</li>
              </ul>
          </div>
          <div>
              <div className={`${styles.font} text-2xl pb-5`}>В работе:</div>
              <ul>
                  <li className={`${styles.number} text-2xl`}>123456</li>
                  <li className={`${styles.number} text-2xl`}>123456</li>
                  <li className={`${styles.number} text-2xl`}>123456</li>
                  <li className={`${styles.number} text-2xl`}>123456</li>
              </ul>
          </div>
        </div>
        <div>
            <div className={`${styles.font} text-2xl pt-14`}>Выполнено за все время:</div>
            <span className={`${styles.number_big_glow}`}>28752</span>
        </div>
        <div className={`${styles.font} text-2xl pt-14`}>Выполнено за сегодня:</div>
        <span className={`${styles.number_big_glow}`}>100</span>
      </div>
    </div>
  );
}
