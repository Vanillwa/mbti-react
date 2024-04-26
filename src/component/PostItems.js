import React, { useEffect, useState } from "react";
import styles from "../css/PostList.module.css";
import notImg from '../svg/person-circle.svg'
import { Link } from "react-router-dom";
import noImg from '../images/noImg.png'
const PostItems = ({ data, status }) => {
  
  const [posts, setPosts] = useState([]);
  const [readhit, setReadhit] = useState(0)

  useEffect(()=>{
    if (data){
      const sortedData = [...data].sort((a,b)=>new Date(b.createdAt) - new Date(a.createdAt))
      setPosts(sortedData)
    }
  }, [data])

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
      {posts.map((item) => {
        const showImg = item.content.match(/<img\s+[^>]*?src\s*=\s*['"]([^'"]*?)['"][^>]*?>/);
        const imgSrc = showImg ? showImg[1] : noImg;
        return (
          <div className={styles.postWrap}>
            <div className={styles.postHeader}>
              <Link to={`/user/${item.User.userId}`}>
              {item.User.profileImage ? <img src alt="profile" className={styles.profileImg} /> : <img src={notImg} alt='guest' className={styles.profileImg} />}
              <span className={styles.nickname}>{item.User.nickname}</span>
              </Link>
              <div className={styles.dateReadhitBox}>
                <div className={styles.readhit}>조회수 : {item.readhit}</div>
                <div className={styles.date}>작성일 : {new Date(item.createdAt).toLocaleDateString()}</div>
              </div>
              
            </div>
            <div className={styles.postBody}>
              <Link to={`/post/view?postId=${item.postId}`} className={styles.content}>
                <div className={styles.imgBox}>
                  <div className={styles.thumbnail}><img className={styles.img} src={imgSrc}/></div>
                </div>
                <div className={styles.titleBox}>
                  <div className={styles.title}>{item.title}</div>
                </div>
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
