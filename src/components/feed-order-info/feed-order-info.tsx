import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOrderByNumber } from "../../services/reducers/get-data";
import { useAppDispatch, useAppSelector } from "../../utils/hook";

const FeedOrderInfo: FC = () => {
  const { id } = useParams();
  let orderId = Number(id);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getOrderByNumber(orderId));
  }, []);
  const order = useAppSelector((state) => state.getData.userOrder);

  return (
    <div className="grid grid-flow-row justify-center">
      {order ? (
        <>
          <div className="text-center">#{order.number}</div>
          <div>{order.name}</div>
          <div>{order.status}</div>
          <div>Состав:</div>
          <div>
            {order.ingredients.map((ingredients) => (
              <div>{ingredients}</div>
            ))}
          </div>
          <div className="grid grid-cols-2 justify-between">
            <div>Вчера, 13:50 i-GMT+3</div>
            <div className="grid grid-flow-col grid-start-end">
              500 <CurrencyIcon type="primary" />
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
export default FeedOrderInfo;
