import { io } from "socket.io-client";
import { useAuthContext } from "../../context/AuthContext";

const url = process.env.REACT_APP_SOCKET_URL;
export const socket = io(url, { withCredentials: true })

socket.on("notification", () => {
	console.log("메세지 전송 받음")
});
