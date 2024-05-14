import React, { useEffect } from 'react';
import {ToastContainer, toast } from 'react-toastify';
import { socket } from '../service/socket/socket';

import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom';
const Alarm = () => {

  const navigate = useNavigate()
  const notify = (data)=> {
    
    toast(`${data.sendUser.nickname} : ${data.message}`,{
      autoClose : 2000,
      position:"bottom-right",
    })
  } 
    // socket.on('notification', notify)

    return (
    <div>
      <ToastContainer onClick={navigate(`/chat/list/`)}/>
    </div>
  );
};

export default Alarm;