import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { socket } from "../service/socket/socket";

import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const Alarm = () => {
  const navigate = useNavigate();

  const [userToastIds, setUserToastIds] = useState({});
  const notify = (data) => {
    if (userToastIds[data.sendUser.nickname]) {
      toast.dismiss(userToastIds[data.sendUser.nickname]);
    }

    const toastId = toast(`${data.sendUser.nickname} : ${data.message}`, {
      autoClose: 2000,
      position: "bottom-right",
      onClick: () => {
        navigate(`/chat/list/${data.roomId}`);
        toast.dismiss(toastId)
      },
    });
    setUserToastIds({
      ...userToastIds,
      [data.sendUser.nickname] : toastId,
    })
  };

  useEffect(() => {
    socket.on("notification", notify);
    return () => {
      socket.off("notification", notify);
    };
  }, [userToastIds]);

  return (
    <div>
      <ToastContainer />
    </div>
  );
};

export default Alarm;
