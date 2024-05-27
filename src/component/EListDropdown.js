import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from "react-router-dom";
import styles from '../css/listDropdown.module.css'
function EListDropdown() {

  return (<>
    <Dropdown>
      <Dropdown.Toggle variant="" id="dropdown-basic" className={styles.dropBtn}>
        E 게시판
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item><Link to='/post/list?mbti=ESTJ'>ESTJ</Link></Dropdown.Item>
        <Dropdown.Item><Link to='/post/list?mbti=ESTP'>ESTP</Link></Dropdown.Item>
        <Dropdown.Item><Link to='/post/list?mbti=ESFJ'>ESFJ</Link></Dropdown.Item>
        <Dropdown.Item><Link to='/post/list?mbti=ESFP'>ESFP</Link></Dropdown.Item>
        <Dropdown.Item><Link to='/post/list?mbti=ENTJ'>ENTJ</Link></Dropdown.Item>
        <Dropdown.Item><Link to='/post/list?mbti=ENTP'>ENTP</Link></Dropdown.Item>
        <Dropdown.Item><Link to='/post/list?mbti=ENFJ'>ENFJ</Link></Dropdown.Item>
        <Dropdown.Item><Link to='/post/list?mbti=ENFP'>ENFP</Link></Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </>
  );
}

export default EListDropdown;
