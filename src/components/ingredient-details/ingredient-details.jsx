import { useEffect } from "react";
import { getIngridientItem, fetchData } from "../../services/reducers/get-data";
import PropTypes from "prop-types";
import styles from "./ingredient-details.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";

export default function IngredientDetails() {
  const dispatch = useDispatch();
  const id = useParams()
  const location = useLocation()
  console.log(location);
  const { ingridients } = useSelector((state) => state.getData);
  const ingridientDetails = ingridients.filter((item) => item._id === id.id);

  useEffect(() => {
    dispatch(fetchData())
    dispatch(getIngridientItem(ingridientDetails));
  }, [dispatch]);

  return (
    <>
      {ingridientDetails &&
        ingridientDetails.map((item) => (
          <section key={item._id} className="grid justify-items-center">
            <div className="modal-content grid px-8 pt-5">
              <div className="flex flex-col justify-center">
                <img src={item.image_large} alt={item.name} />
                <div className="flex justify-center">
                  <p className={styles.modalIngrTitle}>{item.name}</p>
                </div>
                <div className="flex justify-around my-4">
                  <div className="flex flex-col items-center ">
                    <p className={styles.modalIngrElems}>Каллории, ккал.</p>
                    <span className={styles.modalIngrWeight}>{item.calories}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className={styles.modalIngrElems}>Белки, г.</p>
                    <span className={styles.modalIngrWeight}>{item.proteins}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className={styles.modalIngrElems}>Жиры, г.</p>
                    <span className={styles.modalIngrWeight}>{item.fat}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className={styles.modalIngrElems}>Углеводы, г.</p>
                    <span className={styles.modalIngrWeight}>{item.carbohydrates}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
    </>
  );
}
IngredientDetails.propTypes = {
  id: PropTypes.number,
};
