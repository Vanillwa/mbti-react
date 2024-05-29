import React, { useState } from "react";
import styles from "../css/postView.module.css"
import { requestChat } from "../service/api/chatAPI";
import { blockFriend, requestFriend } from "../service/api/friendAPI";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import sweetalert from "./sweetalert";
import { Dropdown } from "react-bootstrap";

function ViewUserDropdown({ data }) {
	const navigate = useNavigate();
	const { memoUserInfo, socket } = useAuthContext();
	const { isLoggedIn, userInfo } = memoUserInfo;
	const [friend, setFriend] = useState("");

	const handleRequestFreind = async (e, userId) => {
		e.preventDefault();
		const result = await requestFriend(userId);

		if (result.message == "success") {
			setFriend("친구 요청 완료");
			socket.emit(`friendRequest`, userId);
			sweetalert.success("친구 요청 완료", "", "확인");
		} else if (result.message == "duplicated") {
			setFriend("이미 친구임.");
			sweetalert.warning("이미 친구임.", "", "확인");
		} else if (result.message == "blocked") {
			setFriend("차단한 친구임.");
			sweetalert.warning("차단한 친구임.", "", "확인");
		} else if (result.message == "pending") {
			setFriend("이미 요청한 친구임.");
			sweetalert.warning("이미 요청한 친구임.", "", "확인");
		} else if (result.message == 'notAvailable') {
			setFriend("본인임.");
			sweetalert.warning("본인에게 친구 요청을 할 수 없습니다.", "", "확인");
		}
	};

	const handleRequestChat = async (e, targetId) => {
		e.preventDefault();
		const result = await requestChat(targetId);

		if (result.message === "success") {
			navigate("/chat", { state: { roomId: result.roomId } });
		} else if (result.message === "noAuth") {
			sweetalert.warning("로그인이 필요한 서비스입니다.");
		} else if (result.message === "notFriend") {
			sweetalert.warning("친구가 아닙니다.");
		} else if (result.message === "duplicated") {
			navigate("/chat", { state: { roomId: result.roomId } });
		}
	};

	const handleRequestBlock = async (e, targetId) => {
		e.preventDefault();
		const result = await blockFriend(targetId);

		if(result.message === 'success'){
			sweetalert.warning("차단에 성공했습니다.");
		}else if(result.message === 'duplicated'){
			sweetalert.warning("이미 차단한 유저입니다.");
		}
	}

	const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
		<a href="" ref={ref} onClick={(e) => { e.preventDefault(); onClick(e); }}>
			{children}
		</a>
	));
	return (
		<Dropdown>
			<Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
				<div className={styles.userInfo}>
					<div className={styles.userImg}><img src={data.User.profileImage} /></div>
					<div className={styles.nickname}>{data.User.nickname}</div>
				</div>
			</Dropdown.Toggle>
			<Dropdown.Menu >
				<Dropdown.Item eventKey="1" onClick={() => { navigate(`/user/${data.User.userId}`) }}>프로필 보기</Dropdown.Item>
				{isLoggedIn && userInfo.userId != data.User.userId ? (
					<>
						<Dropdown.Item eventKey="2" onClick={(e) => handleRequestFreind(e, data.User.userId)}>친구 추가</Dropdown.Item>
						<Dropdown.Item eventKey="3" onClick={(e) => handleRequestChat(e, data.User.userId)}>채팅 요청</Dropdown.Item>
						<Dropdown.Item eventKey="4" onClick={(e) => handleRequestBlock(e, data.User.userId)}>차단하기</Dropdown.Item>
					</>
				) : null}
			</Dropdown.Menu>
		</Dropdown>
	)
}

export default ViewUserDropdown