import React from 'react';
import  Navbar  from './Navbar';
import styles from '../css/Nav.module.css'

const Layout = () => {
  return (
    <div className={styles.container}>
      <Navbar/>
    </div>
  );
};

export default Layout;

