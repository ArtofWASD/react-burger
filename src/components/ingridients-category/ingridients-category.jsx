
import PropTypes from "prop-types";
import styles from "./ingridients-category.module.css"

function IngridientsCategory({ children, title }) {
  return (
    <>
      <div className="flex flex-col py-4">
        <div>
          <p className={`${styles.title} text-2xl py-4`}>{title}</p>
          {children}
        </div>
      </div>
    </>
  );
}

IngridientsCategory.propTypes = {
    title: PropTypes.string.isRequired,
    children:PropTypes.object.isRequired,
  };

export default IngridientsCategory;
