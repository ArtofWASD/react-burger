import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import BurgerIngridientItem from "../burger-ingridient-list-item/burger-ingridient-list-item"

function BurgerIngridientList({ type }) {
  const { ingridients, error } = useSelector((state) => state.getData);
  const ingridientType = ingridients.filter((item) => item.type === type);

  return (
    <div className="grid grid-cols-2 gap-3">
      {error && <h2>{error}</h2>}
      {ingridientType.map(item=>(
        <BurgerIngridientItem key={item._id} data={item}/>
      ))}
    </div>
  );
  
}
BurgerIngridientList.propTypes = {
  type: PropTypes.string.isRequired,
};
export default BurgerIngridientList;
