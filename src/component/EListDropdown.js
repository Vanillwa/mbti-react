import React, { useEffect, useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import styles from '../css/listDropdown.module.css'
function EListDropdown({mbti, setMbti}) {

  const localMbti = window.localStorage.getItem('mbtiType') || ''
  const mbtiTypes = ['ESTJ', 'ESTP', 'ESFJ', 'ESFP', 'ENTJ', 'ENTP', 'ENFJ', 'ENFP'];

  useEffect(()=>{
    if(mbtiTypes.includes(localMbti) == true){
      setMbti(localMbti)
    }else{
      setMbti('')
    }
    setMbti(localMbti)
  },[localMbti])
  

  const handleMbtiChange = (eventKey, e)=>{
    const mbti = e.target.textContent
    if(mbti != '선택 안함'){
      window.localStorage.setItem('mbtiType', mbti)
      setMbti(mbti)
    }else{
      window.localStorage.setItem('mbtiType', 'null')
      setMbti('null')
    }
    
  }


  return (<>
    <Dropdown onSelect={handleMbtiChange}>
      <Dropdown.Toggle variant="" id="dropdown-E" className={styles.dropBtn}>
      {mbtiTypes.includes(localMbti) ? mbti + '게시판' : 'E 게시판'} 
      </Dropdown.Toggle>

      <Dropdown.Menu className={styles.menu}>
      <Dropdown.Item className={styles.item}>선택 안함</Dropdown.Item>
        <Dropdown.Item className={styles.item}>ESTJ</Dropdown.Item>
        <Dropdown.Item className={styles.item}>ESTP</Dropdown.Item>
        <Dropdown.Item className={styles.item}>ESFJ</Dropdown.Item>
        <Dropdown.Item className={styles.item}>ESFP</Dropdown.Item>
        <Dropdown.Item className={styles.item}>ENTJ</Dropdown.Item>
        <Dropdown.Item className={styles.item}>ENTP</Dropdown.Item>
        <Dropdown.Item className={styles.item}>ENFJ</Dropdown.Item>
        <Dropdown.Item className={styles.item}>ENFP</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </>
  );
}

export default EListDropdown;
