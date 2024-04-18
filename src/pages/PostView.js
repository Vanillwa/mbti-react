import React from "react";
import '../css/postView.css'
import { useSearchParams } from "react-router-dom";
import { getPostView } from "../service/api";
import { useQuery } from "react-query";

function PostView (){
  const [query, setQuery] = useSearchParams();
  const postId = query.get("postId")
  

  const { data, status } = useQuery(
    ["getPostView", postId],
    () => getPostView(postId),
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
  
  return(
    <div className="post">
      {data.title}
    </div>
  );
}

export default PostView;