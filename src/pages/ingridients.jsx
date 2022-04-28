import Modal from "../components/modal/modal";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchData } from "../services/reducers/get-data";

export default function IngridientsPage() {
  const [modalActive, setModalActive] = useState(true);
  const { id } = useParams();
  const data = useSelector((state) => state.getData.ingridients);
  console.log(data);
  const isLogged = useSelector((state) => state.authData.userData.success);
  const ingredient = data.find((item) => item._id === id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function close() {
    setModalActive(false)
    navigate('/', {replace:true})
  }
  return (
    <>
      {data.length > 0 ? (
        <Modal active={modalActive} setActive={close} id={id} title={ingredient.name}>
          <IngredientDetails itemId={id} />
        </Modal>
      ):(<IngredientDetails itemId={id}/>)}
    </>
  );
}
