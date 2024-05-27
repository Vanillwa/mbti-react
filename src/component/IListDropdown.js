import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import styles from '../css/listDropdown.module.css'
function IListDropdown() {
  const [query, setQuery] = useSearchParams();
  const mbti = query.get("mbti");
  console.log(mbti)

  const mbtiTypes = ['ESTJ', 'ESTP', 'ESFJ', 'ESFP', 'ENTJ', 'ENTP', 'ENFJ', 'ENFP', 'null'];

  return (<>
  
    <Dropdown>
      <Dropdown.Toggle variant="" id="dropdown-I" className={styles.dropBtn}>
      {mbtiTypes.includes(mbti) ? 'I게시판' : mbti + '게시판'}
      </Dropdown.Toggle>
      <Dropdown.Menu className={styles.menu}>
        <Dropdown.Item className={styles.item} as={Link} to="/post/list?mbti=ISTJ">ISTJ</Dropdown.Item>
        <Dropdown.Item className={styles.item} as={Link} to="/post/list?mbti=ISTP">ISTP</Dropdown.Item>
        <Dropdown.Item className={styles.item} as={Link} to="/post/list?mbti=ISFJ">ISFJ</Dropdown.Item>
        <Dropdown.Item className={styles.item} as={Link} to="/post/list?mbti=ISFP">ISFP</Dropdown.Item>
        <Dropdown.Item className={styles.item} as={Link} to="/post/list?mbti=INTJ">INTJ</Dropdown.Item>
        <Dropdown.Item className={styles.item} as={Link} to="/post/list?mbti=INTP">INTP</Dropdown.Item>
        <Dropdown.Item className={styles.item} as={Link} to="/post/list?mbti=INFJ">INFJ</Dropdown.Item>
        <Dropdown.Item className={styles.item} as={Link} to="/post/list?mbti=INFP">INFP</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </>
  );
}

export default IListDropdown;
