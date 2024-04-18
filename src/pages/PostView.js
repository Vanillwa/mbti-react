import React from "react";
import '../css/postView.css'

function PostView (){

  return(
    <div className="post">
      <div className="post-header">
        <img src={profileImg} alt="profile" className="profile-img"/>
        <span className="nickname">{nickname}</span>
        <span className="date">{date}</span>
      </div>
      <div className="post-body">
        <img src={postImg} alt="post" className="post-img"/>
        <div className="text-content">
          <div className="title">{title}</div>
          <div className="content">{content}</div>
        </div>
      </div>
    </div>
  );
}

export default PostView;