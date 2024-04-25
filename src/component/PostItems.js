import React from "react";
import styles from "../css/PostList.module.css";
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
  if(data.length == 0){
    return(
      <div>
        <h1>작성된 글이 없습니다.</h1>
      </div>
    )
  }
  return (
    <>
      {data.map((item) => {
        const showImg = item.content.match(/<img\s+[^>]*?src\s*=\s*['"]([^'"]*?)['"][^>]*?>/);
        const imgSrc = showImg ? showImg[1] : null;
        return (
          <div className={styles.postWrap}>
            <div className={styles.postHeader}>
              <Link to={`/user/${item.User.userId}`}>
              {item.User.profileImage ? <img src alt="profile" className={styles.profileImg} /> : <img src={notImg} alt='guest' className={styles.profileImg} />}
              <span className={styles.nickname}>{item.User.nickname}</span>
              </Link>
              <span className={styles.date}>{new Date(item.createdAt).toLocaleDateString()}</span>
            </div>
            <div className={styles.postBody}>
              <Link to={`/post/view?postId=${item.postId}`} className={styles.content}>
                <div style={{width : '100px', height: "100px"}} className="thumbnail"><img style={{width:"100%", height:"auto"}} src={imgSrc}/></div>
                <div className={styles.title}>{item.title}</div>
              </Link>
            </div>
          </div>
        );
      })}
      <div style={{border : 'none'}} className="post d-flex align-items-center" >1</div>
    </>
  );
};

export default PostItems;
