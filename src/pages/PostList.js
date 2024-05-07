import React, { useState } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { getPostList } from "../service/api";
import PostItems from "../component/PostItems";
import styles from "../css/PostList.module.css";

import PostPagination from "../component/PostPagination";

const PostList = () => {
  const [query, setQuery] = useSearchParams();
  const mbti = query.get("mbti");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
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

  const handleSortClick = (e) => {
    setSort(e.target.value);
    setOrder(!order);
  };

  return (
    <div className={styles.postBox}>
      <select >
        <option value='createdAt'>createdAt</option>
        <option value="readhit">readhit</option>
        <option value="like">like</option>
      </select>
      <PostItems data={data} status={status} />

      <PostPagination data={data} status={status} page={page} setPage={setPage}/>

    </div>
  );
};

export default PostList;
