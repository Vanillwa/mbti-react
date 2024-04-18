import React from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { getPostList } from "../service/api";
import PostItems from "../component/PostItems";
import "../css/PostList.css";

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
    <>
      <PostItems data={data} status={status} />
    </>
  );
};

export default PostList;