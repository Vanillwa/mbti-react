import React from 'react';
import styles from '../css/Modal.module.css'

const ModalImageWidth = '46.5rem'
const ModalImageHeight = '30rem'

const ModalImage = ({data, src, title, setIsOpen}) => {

  return (
    <figure className={styles.figure}>
      <div className={styles.figureBox}>
        <button onClick={(event )=>{
          setIsOpen((state)=> !state)
        }}
        className={styles.figureButton}><img src=''/></button>
      </div>
    </figure>
  );
};

export default ModalImage;