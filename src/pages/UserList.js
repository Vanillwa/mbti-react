import { useQuery } from "react-query";
import { getUserList } from "../service/api";
import { useRef, useState } from "react";
import UserItems from "../component/UserItems";

function UserList() {
  const [filter, setFilter] = useState("");
  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState("");
  const searchRef = useRef();
  const typeRef = useRef();
  const handleFilterOnChange = e => {
    setFilter(e.target.value);
  };

  const search = () => {
    setKeyword(searchRef.current.value);
    setType(typeRef.current.value);
  };
  const handleTypeOnChange = () => {
  
  };

  return (
    <>
      <div>
        <select ref={typeRef} >
          <option value="email">이메일</option>
          <option value="nickname">닉네임</option>
        </select>
        <input type="text" placeholder="검색" ref={searchRef}></input>
        <button type="button" onClick={search}>
          검색
        </button>
      </div>
      <h1>회원목록</h1>
      <select onChange={handleFilterOnChange}>
        <option value="">전체보기</option>
        <option value="blocked">차단된 유저</option>
        <option value="ok">일반 유저</option>
      </select>
      <UserItems filter={filter} keyword={keyword} type={type}/>
    </>
  );
}

export default UserList;