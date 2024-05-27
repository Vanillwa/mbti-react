import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import { Link, useSearchParams } from "react-router-dom";
import styles from '../css/listDropdown.module.css'
function EListDropdown() {
  const [query, setQuery] = useSearchParams();
  const mbti = query.get("mbti");
  console.log(mbti)

  const mbtiTypes = ['ESTJ', 'ESTP', 'ESFJ', 'ESFP', 'ENTJ', 'ENTP', 'ENFJ', 'ENFP'];
  return (<>
    <Dropdown>
      <Dropdown.Toggle variant="" id="dropdown-E" className={styles.dropBtn}>
      {mbtiTypes.includes(mbti) ? mbti + '게시판' : 'E 게시판'} 
      </Dropdown.Toggle>

      <Dropdown.Menu className={styles.menu}>
        <Dropdown.Item className={styles.item} as={Link} to="/post/list?mbti=ESTJ">ESTJ</Dropdown.Item>
        <Dropdown.Item className={styles.item} as={Link} to="/post/list?mbti=ESTP">ESTP</Dropdown.Item>
        <Dropdown.Item className={styles.item} as={Link} to="/post/list?mbti=ESFJ">ESFJ</Dropdown.Item>
        <Dropdown.Item className={styles.item} as={Link} to="/post/list?mbti=ESFP">ESFP</Dropdown.Item>
        <Dropdown.Item className={styles.item} as={Link} to="/post/list?mbti=ENTJ">ENTJ</Dropdown.Item>
        <Dropdown.Item className={styles.item} as={Link} to="/post/list?mbti=ENTP">ENTP</Dropdown.Item>
        <Dropdown.Item className={styles.item} as={Link} to="/post/list?mbti=ENFJ">ENFJ</Dropdown.Item>
        <Dropdown.Item className={styles.item} as={Link} to="/post/list?mbti=ENFP">ENFP</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </>
  );
}

export default EListDropdown;
