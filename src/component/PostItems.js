import React from "react";
import styles from "../css/PostList.module.css";
import { Link } from "react-router-dom";
import UserDropdown from "./userDropdown";
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
  if(data.list.length == 0 ){
    return(
      <div>
        <h1>작성된 글이 없습니다.</h1>
      </div>
    )
  }
  
  return (
    <>
      {data.list.map((item) => {
        const showImg = item.content.match(/<img\s+[^>]*?src\s*=\s*['"]([^'"]*?)['"][^>]*?>/);
        const imgSrc = showImg ? showImg[1] : null;
        return (
          <div className={styles.container} key={item.postId}>
            <div className={styles.postWrap} >
              <Link to={`/post/view?postId=${item.postId}`} className={styles.postContent}>
                <div className={styles.title}>{item.title}</div>
                <UserDropdown item={item} />
                <div  className={styles.readhitBox}>
                <div className={styles.date}>{new Date(item.createdAt).toLocaleDateString()}</div>
                <div className={styles.likes}>❤  {item.like}</div>
                <div className={styles.readhit}>👁 {item.readhit}</div>
                </div>
              </Link>
              <div className={styles.imgBox}>
                  <div className={styles.thumbnail}><img className={styles.img} src={imgSrc}/></div>
                </div>
            </div>
          </div>
        );
      })}
      
    </>
  );
};

export default PostItems;
