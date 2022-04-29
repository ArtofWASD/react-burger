import Modal from "../components/modal/modal";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchData } from "../services/reducers/get-data";

export default function IngridientsPage() {
  const [modalActive, setModalActive] = useState(true);
  const [isData, setIsData] = useState(null);
  const { id } = useParams();
  const data = useSelector((state) => state.getData.ingridients);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ingredient = data.find((item) => item._id === id);
  const location = useLocation();
  
  function close() {
    setModalActive(false);
    navigate("/", { replace: true });
  }

  useEffect(() => {
    dispatch(fetchData());
    checkPath()
  }, []);

 function checkPath() {
   if (location.state && location.state.from.pathname === "/") {
     setIsData(true)
   }else{
     setIsData(false)
   }
 }
  return (
    <>
      {isData ? (
        <Modal active={modalActive} setActive={close} id={id} title={ingredient.name} >
          <IngredientDetails itemId={id} />
        </Modal>
      ) : (
        <div className="flex flex-col justify-center items-center mt-24">
            <IngredientDetails itemId={id} />
        </div>
      )}
    </>
  );
}
