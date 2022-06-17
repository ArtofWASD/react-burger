import { useEffect, FC } from "react";
import { getIngridientItem } from "../../services/reducers/get-data-reducer/get-data";
import { useParams } from "react-router-dom";
import styles from "./ingredient-details.module.css";
import { useAppDispatch, useAppSelector } from '../../utils/hook'

const IngredientDetails:FC = () => {
  
  const dispatch = useAppDispatch();
  const id = useParams()
  const { ingridients } = useAppSelector((state) => state.getData);
  const ingridientDetails = ingridients.filter((item) => item._id === id.id);

  useEffect(() => {
    dispatch(getIngridientItem(ingridientDetails));
  }, []);

  return (
    <>
      {ingridientDetails &&
        ingridientDetails.map((item) => (
          <section key={item._id} className="grid justify-items-center">
            <div className="modal-content grid px-8 pt-5">
              <div className="flex flex-col justify-center ingredient_image">
                <img src={item.image_large} alt={item.name} className=""/>
                <div className="flex justify-center">
                  <p className={`${styles.modalIngrTitle} ingredient_title`}>{item.name}</p>
                </div>
                <div className="flex justify-around my-4">
                  <div className="flex flex-col items-center property_elem ">
                    <p className={styles.modalIngrElems}>Каллории, ккал.</p>
                    <span className={styles.modalIngrWeight}>{item.calories}</span>
                  </div>
                  <div className="flex flex-col items-center property_elem">
                    <p className={styles.modalIngrElems}>Белки, г.</p>
                    <span className={styles.modalIngrWeight}>{item.proteins}</span>
                  </div>
                  <div className="flex flex-col items-center property_elem">
                    <p className={styles.modalIngrElems}>Жиры, г.</p>
                    <span className={styles.modalIngrWeight}>{item.fat}</span>
                  </div>
                  <div className="flex flex-col items-center property_elem">
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
export default IngredientDetails
