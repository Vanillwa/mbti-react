import { getProfileList } from "../service/api/postAPI";
import styles from '../css/profile.module.css';
import { Link, useParams } from 'react-router-dom';
import noImg from '../images/noImg.png';
import { useQuery } from "react-query";


function Profile() {
  const { userId } = useParams()

  const { data, status } = useQuery(
    ['getProfileList', userId],
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

  const { nickname } = data.userInfo

  function removeHTMLTags(htmlString) {
    return htmlString.replace(/<[^>]*>?/gm, '');
  }

  return (
    <>
      <div className={`container ${styles.container}`}>
        <h2>{nickname}님의 게시글</h2>
      </div>
      {data.recentPost.map((userdata) => (
        <div className={`row ${styles.postBox}`} key={userdata.writerId}>
          <div className={`col-3 ${styles.postWrap}`}>
            <div className={styles.postHeader}>
            <img className={styles.img} src={userdata.content.match(/<img\s+[^>]*?src\s*=\s*['"]([^'"]*?)['"][^>]*?>/)?.[1] || noImg} />
            </div>
            <div className={styles.postBody}>
              <Link to={`/post/view?postId=${userdata.postId}`} className={styles.content}>
                <div className={styles.imgBox}>
                  <div className={styles.thumbnail}>
                  
                  </div>
                   <div className={styles.dateReadhitBox}>
                <div className={styles.contnet}> {removeHTMLTags(userdata.content)}</div>
                <div className={styles.title}> {userdata.title}</div>
              </div>
                </div>
                <div className={styles.titleBox}>
                </div>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Profile;