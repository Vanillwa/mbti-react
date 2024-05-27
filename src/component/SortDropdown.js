import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import styles from '../css/SortDropdown.module.css';

const SortDropdown = () => {
  const [sort, setSort] = useState(window.localStorage.getItem('sort') || 'createdAt');
  const [order, setOrder] = useState(window.localStorage.getItem('order') || 'desc');

  const [sortLabel, setSortLabel] = useState('날짜순');
  const [orderLabel, setOrderLabel] = useState('최신순');

  useEffect(() => {
    if (sort === 'createdAt') {
      setSortLabel('날짜순');
    } else if (sort === 'readhit') {
      setSortLabel('조회순');
    } else if (sort === 'like') {
      setSortLabel('좋아요순');
    }

    if (sort === 'createdAt' && order === 'desc') {
      setOrderLabel('최신순');
    } else if (sort === 'createdAt' && order === 'asc') {
      setOrderLabel('오래된순');
    } else if (sort !== 'createdAt' && order === 'desc') {
      setOrderLabel('많은순');
    } else if (sort !== 'createdAt' && order === 'asc') {
      setOrderLabel('적은순');
    }
  }, [sort, order]);

  const handleSortChange = (eventKey) => {
    setSort(eventKey);
    window.localStorage.setItem('sort', eventKey);
  };

  const handleOrderChange = (eventKey) => {
    if (eventKey === 'createdAt' || eventKey === 'most') {
      setOrder('desc');
      window.localStorage.setItem('order', 'desc');
    } else if (eventKey === 'oldest' || eventKey === 'least') {
      setOrder('asc');
      window.localStorage.setItem('order', 'asc');
    }
  };

  return (
    <>
      <Dropdown onSelect={handleSortChange}>
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
