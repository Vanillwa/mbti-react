import { io } from "socket.io-client";

const url = process.env.REACT_APP_SOCKET_URL;
const socket = io(url, { withCredentials: true })

export const socketLogin = () => {
	socket.emit("login");
}

export const socketLogout = () => {
	socket.emit("logout");
}

socket.on("notification", () => {
	console.log("메세지 전송 받음")
});