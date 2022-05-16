import React from "react";
import { FC } from "react";
import styles from "./ingridients-category.module.css";

type TIngridientCategory = {
  title: string;
  children: React.ReactNode;
  ref: React.Ref<HTMLDivElement>;
};

const IngridientsCategory: FC<TIngridientCategory> = React.forwardRef(({ children, title }, ref) => (
  <>
    <div className="flex flex-col py-4" ref={ref}>
      <div>
        <p className={`${styles.title} text-2xl py-4`}>{title}</p>
        {children}
      </div>
    </div>
  </>
));

export default IngridientsCategory;
