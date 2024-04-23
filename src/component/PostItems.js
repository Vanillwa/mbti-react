import React from "react";
import "../css/PostList.css";
import notImg from '../svg/person-circle.svg'
import { Link } from "react-router-dom";

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
          <div className="post">
            <div className="post-header">
              <Link to={`/user/${item.User.userId}`}>
              {item.User.profileImage ? <img src alt="profile" className="profile-img" /> : <img src={notImg} alt='guest' className="profile-img" />}
              <span className="nickname">{item.User.nickname}</span>
              </Link>
              <span className="date">{new Date(item.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="post-body">
              <div className="img-section">
              {item.User.profileImage ? <img src={item.postImg} alt="post" className="post-img" /> : <div className="post-img"></div>}
              </div>
              <Link to={`/post/view?postId=${item.postId}`} className="text-content ">
                <div className="title">{item.title}</div>
                <div className="content">{item.content}</div>
              </Link>
              <div>{item.likes} {item.comment} {item.readhit}</div>
            </div>
          </div>
        );
      })}
      <div style={{border : 'none'}} className="post d-flex align-items-center" >1</div>
    </>
  );
};

export default PostItems;
