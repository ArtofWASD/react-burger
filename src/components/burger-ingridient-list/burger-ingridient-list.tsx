import React from "react";
import { FC } from "react";
import { useAppSelector } from "../../utils/hook";
import BurgerIngridientItem from "../burger-ingridient-list-item/burger-ingridient-list-item";

type TBurgerIngridientList = {
  type: string;
  ref?: React.Ref<HTMLDivElement>;
};
const BurgerIngridientList: FC<TBurgerIngridientList> = React.forwardRef(({ type }, ref) => {
  const { ingridients } = useAppSelector((state) => state.getData);
  const ingridientType = ingridients.filter((item) => item.type === type);
  return (
    <div className="grid grid-cols-2 gap-3" ref={ref}>
      {ingridientType.map((item) => (
        <BurgerIngridientItem key={item._id} data={item} route={item._id} />
      ))}
    </div>
  );
});
export default BurgerIngridientList;
