import React, {useState} from "react";
import ReactDOM from 'react-dom'
import closeBtn from '../../images/cancel.png'
import ModalOverlay from '../modal-overlay/modal-overlay'

export default function Modal(props){
    const [showModal, setShowModal] = useState({
        showModal:false
    })
    
    const showModalFunc =() =>{
        setShowModal({showModal:true})
    }
    const closeModalFunc = () =>{
        setShowModal({showModal:false})
    }
    return ReactDOM.createPortal(
        <section className="modal">
            <div className="modal-title">
                <p>{props.name}</p>
            </div>
            <div className="modal-close">       
            <img src={closeBtn} alt="Закрыть" onClick={closeModalFunc}/>
            </div>
            <ModalOverlay/>
        </section>,
        document.querySelector('root')
    )
}