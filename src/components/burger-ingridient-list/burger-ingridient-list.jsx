import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import BurgerIngridientItem from "../burger-ingridient-list-item/burger-ingridient-list-item"


const BurgerIngridientList = React.forwardRef(({type}, ref) =>{
  const { ingridients, error } = useSelector((state) => state.getData);
  const ingridientType = ingridients.filter((item) => item.type === type);
  return (
    <div className="grid grid-cols-2 gap-3" ref={ref}>
      {error && <h2>{error}</h2>}
      {ingridientType.map(item=>(
        <BurgerIngridientItem key={item._id} data={item} route={item._id}/>
      ))}
    </div>
  );
})

BurgerIngridientList.propTypes = {
  type: PropTypes.string.isRequired,
};
export default BurgerIngridientList;
