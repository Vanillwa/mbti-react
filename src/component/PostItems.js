import React from "react";
import "../css/PostList.css";

const PostItems = ({ data, status }) => {


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
    <>
      {data.map((item) => {
        return (
          <div className="container" key={item.postId}>
            
            <div className="title">{item.title}</div>
            <div>{item.content}</div>
            <div>{item.User.nickname}</div>
            <div></div>
          </div>
        );
      })}
    </>
  );
};

export default PostItems;
