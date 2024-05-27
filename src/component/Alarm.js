import React, { useEffect, useState } from "react";
import { ToastContainer, Zoom, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const Alarm = () => {
  const navigate = useNavigate();
  const { memoUserInfo,socket } = useAuthContext();
  const [userToastIds, setUserToastIds] = useState({});
  const [requestIds, setRequestIds] = useState({})

  const notify = (data) => {
    if (userToastIds[data.sendUser.nickname]) {
      toast.dismiss(userToastIds[data.sendUser.nickname]);
    }

    const toastId = toast(`${data.sendUser.nickname} : ${data.message}`, {
      autoClose: 2000,
      transition: Zoom,
      position: "bottom-right",
      onClick: () => {
        navigate("/chat", { state: { roomId: data.roomId } });
        toast.dismiss(toastId)
      },
    });
    setUserToastIds({
      ...userToastIds,
      [data.sendUser.nickname]: toastId,
    })
  };

  const reqNotify = () => {
    const toastRequestId = toast(`친구 요청이 있습니다.`, {
      autoClose: 2000,
      transition: Zoom,
      position: "bottom-right",
      onClick: () => {
        navigate(`/friend`);
        toast.dismiss(toastRequestId)
      },
    });
    console.log('요청옴')
    setRequestIds({
      ...requestIds,
    })
  }

  useEffect(() => {
    socket.on("notification", notify);
    return () => socket.off("notification", notify);
  }, [userToastIds]);

  useEffect(() => {
    socket.on('friendRequest', reqNotify);
    return () => socket.off('friendRequest', reqNotify)
  }, [requestIds])

  return (
    <div>
      <ToastContainer />
    </div>
  );
};

export default Alarm;
