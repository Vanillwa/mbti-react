import React from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import styles from '../css/listDropdown.module.css'
function IListDropdown() {

  return (<>
    <Dropdown>
      <Dropdown.Toggle variant="" id="dropdown-basic" className={styles.dropBtn}>
        I 게시판
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item><Link to='/post/list?mbti=ISTJ'>ISTJ</Link></Dropdown.Item>
        <Dropdown.Item><Link to='/post/list?mbti=ISTP'>ISTP</Link></Dropdown.Item>
        <Dropdown.Item><Link to='/post/list?mbti=ISFJ'>ISFJ</Link></Dropdown.Item>
        <Dropdown.Item><Link to='/post/list?mbti=ISFP'>ISFP</Link></Dropdown.Item>
        <Dropdown.Item><Link to='/post/list?mbti=INTJ'>INTJ</Link></Dropdown.Item>
        <Dropdown.Item><Link to='/post/list?mbti=INTP'>INTP</Link></Dropdown.Item>
        <Dropdown.Item><Link to='/post/list?mbti=INFJ'>INFJ</Link></Dropdown.Item>
        <Dropdown.Item><Link to='/post/list?mbti=INFP'>INFP</Link></Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </>
  );
}

export default IListDropdown;
