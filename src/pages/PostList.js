import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { getPostList } from "../service/api/postAPI";
import PostItems from "../component/PostItems";
import styles from "../css/PostList.module.css";
import Paging from "../component/Paging";
import EListDropdown from "../component/EListDropdown";
import IListDropdown from "../component/IListDropdown";
import SortDropdown from "../component/SortDropdown";

const PostList = () => {
  const [query, setQuery] = useSearchParams();
  const mbti = query.get("mbti");

  const readPage = parseInt(query.get("page") || "1", 10);

  const [page, setPage] = useState(readPage);
  const [size, setSize] = useState(8);
  const [sort, setSort] = useState("createdAt");
  const [order, setOrder] = useState("desc");


  const { data, status } = useQuery(
    ["getPostList", mbti, size, sort, order, page],
    () => getPostList(mbti, size, sort, order, page),
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
  useEffect(() => {
    setQuery({ page, mbti, sort, order });
  }, [page, mbti, sort, order]);


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
  if (data.list.length === 0) {
    return (
      <div>
        <h1>작성된 글이 없습니다.</h1>
      </div>
    );
  }
  return (
    <div className={styles.postBox}>
      {mbti == "null" ? <h2>전체게시판</h2> : <h2>{mbti}게시판</h2>}
      <div className={styles.sortBox}>
        <div className={`${styles.menu} ${styles.mbtiMenu}`}>
          <EListDropdown />
        </div>
        <div className={`${styles.menu} ${styles.mbtiMenu}`}>
          <IListDropdown />
        </div>
        <SortDropdown sort = {sort} setSort={setSort} setOrder={setOrder} />
      </div>
      <div className={styles.postItemsBox}>
        <PostItems data={data} status={status} />
      </div>
      {data?.list?.length == 0 ? null : (
        <div className={styles.pagingBox}>
          <Paging data={data} status={status} page={page} setPage={setPage} />
        </div>
      )}
    </div>
  );
};

export default PostList;
