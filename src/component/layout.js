import React, { useEffect } from "react";
import Navbar from "./Navbar";
import styles from "../css/Nav.module.css";
import { useQuery } from "react-query";
import { getChatList } from "../service/api/chatAPI";
import { socket } from "../service/socket/socket";
import { useLocation } from "react-router-dom";

const Layout = () => {
  const {pathname} = useLocation()
  const { data, status, refetch } = useQuery(
    ["getChatList"],
    () => getChatList(),
    { retry: false, refetchOnWindowFocus: false }
  );
  useEffect(()=>{
    refetch()
  },[pathname, refetch])

  socket.on("notification", async () => {
    await refetch();
  });

  if (status === "loading") {
    return (
      <div className="container">
        <h1>Loading...</h1>
      </div>
    );
  } else if (status === "error") {
    return (
      <div className="container">
        <h1>error!</h1>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Navbar chatData = {data.result}/>
    </div>
  );
};

export default Layout;
