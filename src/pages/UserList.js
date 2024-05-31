import { useQuery } from "react-query";
import { getUserList } from "../service/api/userAPI";
import { useRef, useState } from "react";
import UserItems from "../component/UserItems";
import styles from "../css/UserList.module.css";
import Paging from "../component/Paging";

function UserList() {

  const [size, setSize] = useState(10);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState("");
  const searchRef = useRef();
  const typeRef = useRef();

  const { data, status, refetch } = useQuery(
    ["getUserList", filter, keyword, type, page, size],
    () => getUserList(filter, keyword, type, page, size),
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  const handleFilterOnChange = e => {
    setFilter(e.target.value);
  };

  const search = (e) => {
    e.preventDefault()
    if (searchRef.current.value === "") return;
    setKeyword(searchRef.current.value);
    setType(typeRef.current.value);
  };

  return (
    <section className={styles.section}>
      <h1 className="p-2">회원목록</h1>
      <div className={styles.searchType}>
        <div className={styles.searchUser}>
          <div className="d-flex justify-content-center gap-2">
          <select className={styles.searchUserType} ref={typeRef}>
            <option value="nickname">닉네임</option>
            <option value="email">이메일</option>
          </select>
          <form onSubmit={search} >
          <input
            className={`me-1 ms-1 ${styles.searchBox}`}
            type="text"
            placeholder="검색"
            ref={searchRef}></input>
              <button type="reset" onClick={()=>{setKeyword("")}} className="bg-white" style={{border:"none", padding:"12px"}}>✖</button>
            </form>
          <button className={styles.searchBtn} type="button" onClick={search}>
            검색
          </button>
          </div>
        
        </div>
        <div className={styles.showUser}>
          <select
            className={`mb-4 ${styles.showUserType}`}
            onChange={handleFilterOnChange}>
            <option value="">전체보기</option>
            <option value="blocked">차단된 유저</option>
            <option value="ok">일반 유저</option>
          </select>
        </div>
      </div>
      <UserItems
        data={data}
        status={status}
        filter={filter}
        keyword={keyword}
        type={type}
        refetch={refetch}
      />
      <div className={styles.userPaging}>
        {data?.result?.length == 0 ? null : (
          <Paging data={data} status={status} page={page} setPage={setPage} />
        )}
      </div>
    </section>
  );
}

export default UserList;
