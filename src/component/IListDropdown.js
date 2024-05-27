import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import styles from "../css/listDropdown.module.css";
function IListDropdown({ mbti, setMbti }) {
  const localMbti = window.localStorage.getItem("mbtiType") || "";

  useEffect(() => {
    setMbti(localMbti);
  }, [localMbti]);

  const handleMbtiChange = (eventKey, e) => {
    const mbti = e.target.textContent;
    if (mbti != "선택 안함") {
      window.localStorage.setItem("mbtiType", mbti);
      setMbti(mbti);
    } else {
      window.localStorage.setItem("mbtiType", "null");
      setMbti("null");
    }
  };

  const mbtiTypes = [
    "ISTJ",
    "ISTP",
    "ISFJ",
    "ISFP",
    "INTJ",
    "INTP",
    "INFJ",
    "INFP",
  ];
  console.log(localMbti);

  return (
    <>
      <Dropdown onSelect={handleMbtiChange}>
        <Dropdown.Toggle variant="" id="dropdown-I" className={styles.dropBtn}>
          {mbtiTypes.includes(localMbti) ? mbti + "게시판" : "I게시판"}
        </Dropdown.Toggle>
        <Dropdown.Menu className={styles.menu}>
          <Dropdown.Item className={styles.item}>선택 안함</Dropdown.Item>
          <Dropdown.Item className={styles.item}>ISTJ</Dropdown.Item>
          <Dropdown.Item className={styles.item}>ISTP</Dropdown.Item>
          <Dropdown.Item className={styles.item}>ISFJ</Dropdown.Item>
          <Dropdown.Item className={styles.item}>ISFP</Dropdown.Item>
          <Dropdown.Item className={styles.item}>INTJ</Dropdown.Item>
          <Dropdown.Item className={styles.item}>INTP</Dropdown.Item>
          <Dropdown.Item className={styles.item}>INFJ</Dropdown.Item>
          <Dropdown.Item className={styles.item}>INFP</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default IListDropdown;
