import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getOrderByNumber } from "../../services/reducers/get-data";

const FeedOrderInfo: FC = () => {
  const location = useLocation();
  const [userOrder, setUserOrder] = useState()
  const { id } = useParams();
  let orderId = Number(id);
  useEffect(() => {
    getOrderByNumber(orderId);
  },[])
  
  console.log(userOrder);
  
  return (
    <div className="grid grid-flow-row justify-center">
      <div className="text-center">#034533</div>
      {id}
      <div>Black Hole Singularity острый бургер</div>
      <div>Выполнен</div>
      <div>Состав:</div>
      <div>
        <div>ingridientItem</div>
        <div>ingridientItem</div>
        <div>ingridientItem</div>
        <div>ingridientItem</div>
      </div>
      <div className="grid grid-cols-2 justify-between">
        <div>Вчера, 13:50 i-GMT+3</div>
        <div className="grid grid-flow-col grid-start-end">
          500 <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
export default FeedOrderInfo;
