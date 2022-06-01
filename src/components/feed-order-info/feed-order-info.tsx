import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useGetOrdersAllQuery } from "../../services/reducers/socket";


const FeedOrderInfo: FC = () => {
  const location = useLocation();
  const {data} = useGetOrdersAllQuery()  
  const { id } = useParams();

  return (
    <div className='grid grid-flow-row'>
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
        <div className="grid grid-flow-col grid-start-end">500 <CurrencyIcon type='primary'/></div>
      </div>
    </div>
  );
};
export default FeedOrderInfo;
