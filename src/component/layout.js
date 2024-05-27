import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { useQuery } from "react-query";
import { getChatList } from "../service/api/chatAPI";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const Layout = () => {
  const { socket } = useAuthContext()
  const { pathname } = useLocation()
  const { data, status, refetch } = useQuery(
    ["getChatList"],
    () => getChatList(),
    { retry: false, refetchOnWindowFocus: false }
  );
  useEffect(() => {
    refetch()
  }, [pathname, refetch])

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
    <Navbar chatData={data.result} chatStatus={status} />
  );
};

export default Layout;
