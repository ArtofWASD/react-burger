import { useEffect } from "react";
import PropTypes from "prop-types";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";

function Modal({ active, setActive, id, data, isConstructor }) {
  const closeModal = () => {
    setActive(false);
  };

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    });
  });

  return (
    <>
      {active && (
        <ModalOverlay
          className={active ? styles.modalOverlayActive : styles.modalOverlay}
          closeModal={closeModal}
        >
          {isConstructor && (
            <OrderDetails
              isActive={active}
              onClose={setActive}
              styles={styles}
            />
          )}

          {id && (
            <IngredientDetails
              isActive={active}
              onClose={setActive}
              style={styles}
              itemData={data}
              itemId={id}
            />
          )}
        </ModalOverlay>
      )}
    </>
  );
}

Modal.propType = {
  id: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  isConstructor: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
  }),
};
export default Modal;
