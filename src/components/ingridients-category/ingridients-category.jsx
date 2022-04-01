import React from 'react'
import PropTypes from "prop-types";
import styles from "./ingridients-category.module.css"

const IngridientsCategory = React.forwardRef(({children, title}, ref ) => (
<>
  <div className="flex flex-col py-4">
    <div>
      <p className={`${styles.title} text-2xl py-4`} ref={ref}>{title}</p>
      {children}
    </div>
  </div>
</>
))

IngridientsCategory.propTypes = {
    title: PropTypes.string.isRequired,
    children:PropTypes.object.isRequired,
  };

export default IngridientsCategory;
