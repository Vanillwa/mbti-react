import React, { useEffect } from 'react';
import {ToastContainer, toast } from 'react-toastify';
import { socket } from '../service/socket/socket';



const Alarm = () => {

  const notify = ()=> toast('메세지가 도착했습니다.')

  useEffect(()=>{
    setTimeout(()=>{
      socket.on('notification', notify)
    })
    
    
  },[])
    return (
    <div> 
      <ToastContainer/>
    </div>
  );
};

export default Alarm;