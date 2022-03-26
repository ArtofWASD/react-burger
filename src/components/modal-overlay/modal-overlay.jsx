import styles from './modal-overlay.module.css';

function ModalOverlay ({isActive, onClose}){
    return(
        <section className={isActive? styles.modalOverlayActive : styles.modalOverlay} onClick={onClose}>
        </section>
    )
}
export default ModalOverlay

