import React from 'react';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './modal-title.module.css'
const ModalTitle = ({title, onClose}) => {
    return (
        <div>
            <div className="flex justify-between items-center px-7 pt-10">
          <div>
            <p className={title ? styles.modalTitle : styles.modalTitleHide}>{title}</p>
          </div>
          <div onClick={onClose} className="flex justify-end">
            <CloseIcon type="primary" />
          </div>
        </div>
        </div>
    );
}

export default ModalTitle;
