import { getProfileList } from "../service/api/postAPI";
import styles from "../css/profile.module.css";
import { Link, useParams } from "react-router-dom";
import noImg from "../images/noImg.png";
import { useQuery } from "react-query";
import readhit from "../svg/readhit.svg";
import like from "../svg/like.svg";
import Footer from "../component/Footer";
import React from "react";
import { Dropdown } from "react-bootstrap";
import { useAuthContext } from "../context/AuthContext";
import { ReactComponent as ThreeDots } from "../svg/three-dots.svg"
import ViewUserDropdown from "../component/ViewUserDropdown";

function Profile() {
  const { userId } = useParams();
  const { memoUserInfo } = useAuthContext();
  const { isLoggedIn, userInfo } = memoUserInfo;

  const { data, status } = useQuery(
    ["getProfileList", userId],
    () => getProfileList(userId),
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a href="" ref={ref} onClick={(e) => { e.preventDefault(); onClick(e); }}>
      {children}
    </a>
  ));

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

  const { nickname } = data.userInfo;

  function removeHTMLTags(htmlString) {
    return htmlString.replace(/<[^>]*>?/gm, "");
  }

  console.log(data)
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span>최근 게시글</span>
        <ViewUserDropdown user={data.userInfo} />
      </div>

      <div className={`container ${styles.Container}`}>
        <div className={`row ${styles.Wrap}`}>
          {data.recentPost.length === 0 ? <div className={styles.noList}>작성된 글이 없습니다.</div> : data.recentPost.map((userdata) => (
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
    </section>
  );
}

export default Profile;
