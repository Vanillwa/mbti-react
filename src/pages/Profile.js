import { useContext, useState, useEffect } from 'react';
// import { UserContext } from '../context/UserContext';
import { getProfileList } from '../service/api';
import styles from '../css/PostList.module.css';
import { Link, useParams } from 'react-router-dom';
import noImg from '../images/noImg.png';
import { useQuery } from "react-query";
// import UserDropdown from "../component/userDropdown";
import PostPagination from "../component/PostPagination";

function Profile() {
  // userId값을 받아옴
const {userId} = useParams()


  const { data, status } = useQuery(
    ['getProfileList',userId],
    () => getProfileList(userId),
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

  if (data.length == 0) {
    return (
      <div>
        <h1>작성된 글이 없습니다.</h1>
      </div>
    );
  }

 
  const {nickname} = data.userInfo

  console.log(data)
  return (
    <>  
     <div className="container">
        <h2>{nickname}님의 게시글</h2>
     
      </div>
      {data.recentPost.map((userdata) => (
        <div className={styles.postBox}>
        <div className={styles.postWrap} key={userdata.writerId}>
          <div className={styles.postHeader}>
              
              <div className={styles.dateReadhitBox}>         
              <div className={styles.readhit}>작성자:{nickname}</div>
              <div className={styles.likes}>❤ {userdata.like}</div>
              <div className={styles.readhit}>Views: {userdata.readhit}</div>
              <div className={styles.date}>Created: {new Date(userdata.createdAt).toLocaleDateString()}</div>
            </div>
          </div>
          <div className={styles.postBody}>
            <Link to={`/post/view?postId=${userdata.postId}`} className={styles.content}>
              <div className={styles.imgBox}>
                <div className={styles.thumbnail}>
                  <img className={styles.img} src={userdata.content.match(/<img\s+[^>]*?src\s*=\s*['"]([^'"]*?)['"][^>]*?>/)?.[1] || noImg} />
                </div>
              </div>
              <div className={styles.titleBox}>
                <div className={styles.title}>{userdata.title}</div>
              </div>
            </Link>
          </div>
        </div>
        </div>
      ))}
      <div style={{ border: 'none' }} className="post d-flex align-items-center"></div>
      
    </>
  );
}

export default Profile;