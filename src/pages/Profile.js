import { getProfileList } from "../service/api/postAPI";
import styles from "../css/profile.module.css";
import { Link, useParams } from "react-router-dom";
import noImg from "../images/noImg.png";
import { useQuery } from "react-query";
import readhit from "../svg/readhit.svg";
import like from "../svg/like.svg";

function Profile() {
  const { userId } = useParams();

  const { data, status } = useQuery(
    ["getProfileList", userId],
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

  const { nickname } = data.userInfo;

  function removeHTMLTags(htmlString) {
    return htmlString.replace(/<[^>]*>?/gm, "");
  }

  console.log(data)
  return (
    <>
     <h2 className={styles.mainTitle}>{nickname}님의 게시글</h2>
      <div className={`container ${styles.Container}`}>
        <div className={`row ${styles.Wrap}`}>

          {data.recentPost.map((userdata) => (
            <Link to={`/post/view?postId=${userdata.postId}`} className={`col-2 ${styles.postWrap}`} key={userdata.writerId}>
              <div className={styles.postHeader}>
                <img
                  className={styles.img}
                  src={
                    userdata.content.match(
                      /<img\s+[^>]*?src\s*=\s*['"]([^'"]*?)['"][^>]*?>/
                    )?.[1] || noImg
                  }
                />
              </div>
              <div className={styles.postBody}>
                <div>
                  <div className={styles.imgBox}>
                    <div className={styles.thumbnail}></div>
                    <div className={styles.dateReadhitBox}>
                      <div className={styles.title}>{userdata.title}</div>
                      <div className={styles.content}>
                        {'\u00A0\u00A0'}
                        {removeHTMLTags(userdata.content)}
                      </div>
                      <div className={styles.bottom}>
                        <div>{new Date(userdata.createdAt).toLocaleDateString()}</div>
                        <div className={styles.icone}>
                          <div>
                            <img src={like} />
                            {userdata.like}
                          </div>
                          <div>
                            <img src={readhit} />
                            {userdata.readhit}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.titleBox}></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Profile;
