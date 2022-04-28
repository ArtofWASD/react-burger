import Modal from "../components/modal/modal";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchData } from "../services/reducers/get-data";
import AppHeader from "../components/app-header/app-header";

export default function IngridientsPage() {
  const [modalActive, setModalActive] = useState(true);
  const [isData, setIsData] = useState(null);
  const { id } = useParams();
  const data = useSelector((state) => state.getData.ingridients);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ingredient = data.find((item) => item._id === id);

  function close() {
    setModalActive(false);
    navigate("/", { replace: true });
  }
  useEffect(() => {
    dispatch(fetchData());
    aaa();
  }, []);
  function aaa(params) {
    if (data.length === 0) {
      setIsData(false);
    } else {
      setIsData(true);
    }
  }

  return (
    <>
      {isData ? (
        <Modal active={modalActive} setActive={close} id={id} title={ingredient.name}>
          <IngredientDetails itemId={id} />
        </Modal>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <AppHeader />
          <div className=" mt-24 w-2/5 ">
            <IngredientDetails itemId={id} />
          </div>
        </div>
      )}
    </>
  );
}
