import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../services/reducers/login";
import FeedOrderItem from "../components/feed-order-item/feed-order-item";
import styles from "../pages/styles.module.css";
import { useGetOrdersQuery } from "../services/reducers/socket";
import { getCookie } from "../utils/handler-functions";
export default function Orders() {
  const dispatch = useDispatch();
  const accessToken = getCookie("token")
  const { data } = useGetOrdersQuery(`wss://norma.nomoreparties.space/orders?token=${accessToken}`);
  return (
    <div className={styles.orders_feed}>
      <div className="ml-72 mt-32">
        <ul className="grid gap-4 items-center">
          <NavLink to="/profile" end className={({ isActive }) => (isActive ? `${styles.font}` : `${styles.font_grey}`)}>
            <li className={`text-2xl h-16 grid items-center`}>Профиль</li>
          </NavLink>
          <NavLink to="/profile/orders" end className={({ isActive }) => (isActive ? `${styles.font}` : `${styles.font_grey}`)}>
            <li className={`text-2xl h-16 grid items-center`}>История заказов</li>
          </NavLink>
          <NavLink to="/login">
            <li
              className={`${styles.font_grey} text-2xl h-16 grid items-center`}
              onClick={() => {
                dispatch(logOut());
              }}
            >
              Выход
            </li>
          </NavLink>
        </ul>
      </div>
      <div className={`${styles.orders_feed_list} mt-10`}>
        {data && data.orders.map((item: any) => {
          return (<FeedOrderItem data={item} key={item._id} route={`/profile/orders`} />);
        })}
      </div>
    </div>
  );
}
