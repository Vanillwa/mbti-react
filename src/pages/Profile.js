import { useContext, useState, useEffect } from 'react';
// import { UserContext } from '../context/UserContext';
import { getProfileList } from '../service/api';
import styles from '../css/PostList.module.css';
import { Link } from 'react-router-dom';
import noImg from '../images/noImg.png';
import UserDropdown from "../component/userDropdown";
import { useAuthContext } from "../context/AuthContext";

const Profile = () => {
  const { userInfo } = useAuthContext();
  const [data, setData] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const fetchProfileList = async () => {
      try {
        const profileData = await getProfileList(userInfo.userId);
        setData(profileData);
        setStatus('success');
      } catch (error) {
        setStatus('error');
      }
    };
    fetchProfileList();
  }, [userInfo.userId]);

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

  // Render a message if there are no posts
  if (data.length === 0) {
    return (
      <div>
        <h1>작성된 글이 없습니다.</h1>
      </div>
    );
  }

  console.log(data);


  return (
    <>
      {data.map((item) => {
        const showImg = item.content.match(/<img\s+[^>]*?src\s*=\s*['"]([^'"]*?)['"][^>]*?>/);
        const imgSrc = showImg ? showImg[1] : noImg;
        return (
          <div className={styles.postWrap} key={item.id}>
            <div className={styles.postHeader}>
              <UserDropdown item={item} />
              {console.log(item)}
              <div className={styles.dateReadhitBox}>
                <div className={styles.likes}>❤ {item.like}</div>
                <div className={styles.readhit}>조회수 : {item.readhit}</div>
                <div className={styles.date}>작성일 : {new Date(item.createdAt).toLocaleDateString()}</div>
              </div>
            </div>
            <div className={styles.postBody}>
              <Link to={`/post/view?postId=${item.postId}`} className={styles.content}>
                <div className={styles.imgBox}>
                  <div className={styles.thumbnail}><img className={styles.img} src={imgSrc} /></div>
                </div>
                <div className={styles.titleBox}>
                  <div className={styles.title}>{item.title}</div>
                </div>
              </Link>
            </div>
          </div>
        );
      })}
      <div style={{ border: 'none' }} className="post d-flex align-items-center">1</div>
    </>
  );
};

export default Profile;