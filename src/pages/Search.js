import { useQuery } from "react-query";
import { getSearchResult } from "../service/api/searchAPI";
import { useLocation } from "react-router-dom";
import styles from "../css/Search.module.css";
function Search() {
  const location = useLocation();
  const keyword = location.state.keyword;

  const { data, status } = useQuery(
    ["getSearchResult", keyword],
    () => getSearchResult(keyword),
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

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
console.log(data)
  return (
    <div>
      {data.userList.length == 0 && data.postList.length == 0 ? (
        <div>검색 결과가 없습니다.</div>
      ) : data.userList.length == 0 ? null : 
      <div className={styles.userWrap}>
        <div className={styles.userInner}>
          
          {data.userList.map(item => {
            return <div className={styles.userItem}>
                <div className={styles.imgWrap}>
                    <img src={item.profileImage}/>
                </div>
                <div className={styles.nickname}>
                    {item.nickname}
                </div>
            </div>;
          })}
          
        </div>
        </div>
      }
      {data.postList.length == 0 ? null : (
        <div className={styles.postWrap}>
          {data.postList.map(item => {
            return <div></div>;
          })}
        </div>
      )}
    </div>
  );
}

export default Search;
