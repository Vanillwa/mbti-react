import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "../css/Setting.module.css";
import EListDropdown from "./EListDropdown";
import IListDropdown from "./IListDropdown";
import SortDropdown from "./SortDropdown";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const Setting = ({listStyle, setListStyle, sort, setSort, setOrder, setSize}) => {
  const [mbti, setMbti] = useState(window.localStorage.getItem('mbtiType'))
  const navigate = useNavigate()
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [listStyleLabel, setListStyleLabel] = useState('리스트 형식') 
  const [listLengthLabel, setListLengthLabel] = useState('10')

  const handleLabelChange = (eventKey, e)=>{
    if(e.target.textContent == '리스트 형식'){
      setListStyleLabel('리스트 형식')
      // setListStyle('list')
      window.localStorage.setItem('listType', 'list')
    }else if (e.target.textContent == '카드 형식'){
      setListStyleLabel('카드 형식')
      // setListStyle('card')
      window.localStorage.setItem('listType', 'card')
    }
  }
  const handleLengthChange = (eventKey, e)=>{
    if(e.target.textContent == '5'){
      setListLengthLabel('5')
      window.localStorage.setItem('listLength', '5')
    }else if(e.target.textContent == '10'){
      setListLengthLabel('10')
      window.localStorage.setItem('listLength', '10')
    }else if(e.target.textContent == '15'){
      setListLengthLabel('15')
      window.localStorage.setItem('listLength', '15')
    }
  }
  const handleSettingSave = ()=>{
    const listType = window.localStorage.getItem('listType')
    const mbtiType = window.localStorage.getItem('mbtiType')
    const order = window.localStorage.getItem('order')
    const listLength = window.localStorage.getItem('listLength')
    const sort = window.localStorage.getItem('sort')
    setListStyle(listType)
    setSize(listLength)
    setOrder(order)
    setSort(sort)
    setShow(false)
    navigate(`/post/list?mbti=${mbtiType}`)
  }

  return (
    <>
      <Button variant="" onClick={handleShow} className={styles.button}>
        게시판 설정
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>게시판 설정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.wrap}>
            <div className={styles.listStyle}>
              <div className={styles.name}>
                <span>게시판 형태</span>
              </div>
              <div>
                <Dropdown onSelect={handleLabelChange}>
                  <Dropdown.Toggle
                    variant=""
                    className={styles.dropBtn}
                  >{listStyleLabel}</Dropdown.Toggle>
                  <Dropdown.Menu >
                    <Dropdown.Item >리스트 형식</Dropdown.Item>
                    <Dropdown.Item >카드 형식</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <div className={styles.mbtiStyle}>
              <div className={styles.name}>
                <span>게시판 선택</span>
              </div>
              <div className={styles.mbtiBox}>
                <EListDropdown mbti={mbti} setMbti ={setMbti} /> <IListDropdown mbti={mbti} setMbti ={setMbti}/>
              </div>
            </div>
            <div className={styles.listLength}>
              <div className={styles.name}>
                <span>목록 나열개수</span>
              </div>
              <div>
              <Dropdown onSelect={handleLengthChange}>
                  <Dropdown.Toggle
                    variant=""
                    className={styles.dropBtn}
                  >{listLengthLabel}</Dropdown.Toggle>
                  <Dropdown.Menu >
                    <Dropdown.Item>5</Dropdown.Item>
                    <Dropdown.Item>10</Dropdown.Item>
                    <Dropdown.Item>15</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <div className={styles.sort}>
              <div className={styles.name}>
                <span>정렬</span>
              </div>
              <div className={styles.sortBox}>
                <SortDropdown
                  sort={sort}
                  setSort={setSort}
                  setOrder={setOrder}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSettingSave}>저장</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Setting;
