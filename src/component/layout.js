import React from 'react';
import  Nav  from './Nav';
import LeftSidebar from './LeftSidebar';
import '../css/style.css'

const Layout = () => {
  return (
    <div className='grid-container'>
      <Nav/>
      <LeftSidebar/>
    </div>
  );
};

export default Layout;

