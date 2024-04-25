import React from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { getPostList } from "../service/api";
import PostItems from "../component/PostItems";
import styles from "../css/PostList.module.css";


const PostList = () => {
  const [query, setQuery] = useSearchParams();
  const mbti = query.get("mbti");

  const { data, status } = useQuery(
    ["getPostList", mbti],
    () => getPostList(mbti),
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div className={styles.postBox}>
      
      <PostItems data={data} status={status} />
      
    </div>
  );
};

export default PostList;
