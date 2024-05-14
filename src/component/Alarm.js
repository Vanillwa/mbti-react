import React, { useEffect } from 'react';
import {ToastContainer, toast } from 'react-toastify';
import { socket } from '../service/socket/socket';
import 'react-toastify/dist/ReactToastify.css'
const Alarm = () => {


  const notify = (data)=> {
    toast(`${data.sendUser.nickname} : ${data.message}`,{
      autoClose : 1500,
      position:"bottom-right"
    })
  } 
    socket.on('notification', notify)

    return (
    <div>
      <ToastContainer/>
    </div>
  );
};

export default Alarm;