import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import styles from '../css/SortDropdown.module.css'
const SortDropdown = ({sort, setSort, setOrder}) => {
  const [query, setQuery] = useSearchParams();
  const sortQuery = query.get("sort");
  const orderQuery = query.get('order')

  const [sortLabel, setSortLabel] = useState('날짜순');
  const [orderLabel, setOrderLabel] = useState('최신순');
  
  useEffect(()=>{
    if(sortQuery == 'createdAt'){
      setSortLabel('날짜순')
    }else if(sortQuery == 'readhit'){
      setSortLabel('조회순')
    }else{
      setSortLabel('좋아요순')
    }
    if(orderQuery == 'desc' && sortQuery == 'createdAt'){
      setOrderLabel('최신순')
    }else if (orderQuery == 'asc' && sortQuery == 'createdAt'){
      setOrderLabel('오래된순')
    }else if(orderQuery == 'desc' && sortQuery != 'createdAt'){
      setOrderLabel('많은순')
    }else if(orderQuery == 'asc' && sortQuery != 'createdAt'){
      setOrderLabel('적은순')
    }
  }, [sortQuery, orderQuery])
  useEffect(()=>{

  }, [orderQuery, sortQuery])
  
  
  const handleSortChange = (eventKey, e) => {
    if (eventKey === "createdAt") {
      setSort("createdAt");
    } else if (eventKey === "readhit") {
      setSort("readhit");
    } else if (eventKey === "like") {
      setSort("like");
    }
  };

  const handleOrderChange = (eventKey, e) => {
    if (eventKey === "createdAt" || eventKey === "most") {
      setOrder("desc");
    } else {
      setOrder("asc");
    }
  };
  return (
    <>
      <Dropdown  onSelect={handleSortChange}>
          <Dropdown.Toggle className={styles.dropdown} variant="" id="dropdown-basic">
            {sortLabel}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="createdAt">날짜순</Dropdown.Item>
            <Dropdown.Item eventKey="readhit">조회순</Dropdown.Item>
            <Dropdown.Item eventKey="like">좋아요순</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown onSelect={handleOrderChange}>
          <Dropdown.Toggle className={styles.dropdown} variant="" id="dropdown-basic">
            {orderLabel}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {sort === "createdAt" ? (
              <>
                <Dropdown.Item eventKey="createdAt">최신순</Dropdown.Item>
                <Dropdown.Item eventKey="oldest">오래된순</Dropdown.Item>
              </>
            ) : (
              <>
                <Dropdown.Item eventKey="most">많은순</Dropdown.Item>
                <Dropdown.Item eventKey="least">적은순</Dropdown.Item>
              </>
            )}
          </Dropdown.Menu>
        </Dropdown>
    </>
  );
};

export default SortDropdown;