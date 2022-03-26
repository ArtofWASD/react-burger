import PropTypes from "prop-types";
import styles from "./ingredient-details.module.css";

export default function IngredientDetails({
  itemData,
  isActive,
  itemId,
})

{
  return (
    <>
      {itemData &&
        itemData
          .filter((item) => item._id === itemId)
          .map((item) => (
            <section
              className={isActive ? styles.modalActive : styles.modal}
              key={item._id}
            >
              <div className="modal-content grid px-8 pt-8">
                <div className="flex flex-col justify-center">
                  <img src={item.image_large} alt={item.name} />
                  <div className="flex justify-center">
                    <p className={styles.modalIngrTitle}>{item.name}</p>
                  </div>
                  <div className="flex justify-around pt-6">
                    <div className="flex flex-col items-center">
                      <p className={styles.modalIngrElems}>Каллории, ккал.</p>
                      <span className={styles.modalIngrWeight}>
                        {item.calories}{" "}
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <p className={styles.modalIngrElems}>Белки, г.</p>
                      <span className={styles.modalIngrWeight}>
                        {item.proteins}{" "}
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <p className={styles.modalIngrElems}>Жиры, г.</p>
                      <span className={styles.modalIngrWeight}>
                        {item.fat}{" "}
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <p className={styles.modalIngrElems}>Углеводы, г.</p>
                      <span className={styles.modalIngrWeight}>
                        {item.carbohydrates}
                      </span>
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
  isActive: PropTypes.bool.isRequired,
  itemData: PropTypes.arrayOf(PropTypes.object.isRequired)
};
