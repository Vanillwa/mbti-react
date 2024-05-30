import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { getPostList } from "../service/api/postAPI";
import PostItems from "../component/PostItems";
import PostItemsCard from "../component/PostItemsCard";
import styles from "../css/PostList.module.css";
import Paging from "../component/Paging";
import Setting from "../component/Setting";
import { Spinner } from "react-bootstrap";
import Footer from '../component/Footer'

const PostList = () => {
  const [query, setQuery] = useSearchParams();
  const mbti = query.get("mbti");

  const readPage = parseInt(query.get("page") || "1", 10);

  const [page, setPage] = useState(readPage);
  const [size, setSize] = useState(window.localStorage.getItem('listLength') || 10);
  const [sort, setSort] = useState(window.localStorage.getItem('sort') || "createdAt");
  const [order, setOrder] = useState(window.localStorage.getItem('order') || "desc");

  const [listStyle, setListStyle] = useState(window.localStorage.getItem('listType')=='card' ? 'card' : 'list' || 'list');

  const { data, status } = useQuery(
    ["getPostList", mbti, size, sort, order, page],
    () => getPostList(mbti, size, sort, order, page),
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
  useEffect(() => {
    setQuery({ page, mbti, sort, order, size });
  }, [page, mbti, sort, order, size]);

  if (status === "loading") {
    return (
      <div className="container">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
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
    <div className={styles.postBox}>
      <div className={styles.header}>
        {mbti == "null" ? <h2>전체게시판</h2> : <h2>{mbti}게시판</h2>}
        <Setting
          listStyle={listStyle}
          setListStyle={setListStyle}
          sort={sort}
          setSort={setSort}
          setOrder={setOrder}
          setSize={setSize}
        />
      </div>
      <div className={styles.postItemsBox}>
        {listStyle === "list" ? (
          <PostItems data={data} status={status} />
        ) : <PostItemsCard data={data}/>}
      </div>
      {data?.list?.length == 0 ? null : (
        <div className={styles.pagingBox}>
          <Paging data={data} status={status} page={page} setPage={setPage} />
        </div>
      )}
      <Footer/>
    </div>
  );
};

export default PostList;
