import { useQuery } from "react-query";
import { getSearchResult } from "../service/api/searchAPI";
import { Link, useLocation, useNavigate } from "react-router-dom";
import searchStyles from "../css/Search.module.css";
import styles from "../css/PostList.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper";
import { Navigation } from "swiper";
import UserDropdown from "../component/userDropdown";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import like from "../svg/like.svg";
import eye from "../svg/eye.svg";
import Paging from "../component/Paging";
import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import sweetalert from "../component/sweetalert";
import { requestFriend } from "../service/api/friendAPI";
import { requestChat } from "../service/api/chatAPI";
function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const [friend, setFriend] = useState("");
  const { memoUserInfo } = useAuthContext();
  const { isLoggedIn, userInfo } = memoUserInfo;
  const keyword = location.state.keyword;
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);

  const { data, status } = useQuery(
    ["getSearchResult", keyword, page, size],
    () => getSearchResult(keyword, page, size),
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    setPage(1);
  }, [keyword]);

  const handleRequestChat = async (e, targetId) => {
    e.preventDefault();
    const result = await requestChat(targetId);

    if (result.message === "success") {
      navigate(`/chat/list/${result.roomId}`);
    } else if (result.message === "noAuth") {
      sweetalert.warning("로그인이 필요한 서비스입니다.");
    } else if (result.message === "notFriend") {
      sweetalert.warning("친구가 아닙니다.");
    } else if (result.message === "duplicated") {
      navigate(`/chat/list/${result.roomId}`);
    }
  };

  const handleRequestFreind = async (e, userId) => {
    e.preventDefault();
    const result = await requestFriend(userId);

    if (result.message == "success") {
      setFriend("친구 요청 완료");
      sweetalert.success("친구 요청 완료", "", "확인");
    } else if (result.message == "duplicated") {
      setFriend("이미 친구임.");
      sweetalert.warning("이미 친구임.", "", "확인");
    } else if (result.message == "blocked") {
      setFriend("차단한 친구임.");
      sweetalert.warning("차단한 친구임.", "", "확인");
    } else if (result.message == "pending") {
      setFriend("이미 요청한 친구임.");
      sweetalert.warning("이미 요청한 친구임.", "", "확인");
    }
  };

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

  return (
    <div>
      {data.userList.length == 0 && data.postList.length == 0 ? (
        <h3 className={searchStyles.searchResult}>검색 결과가 없습니다.</h3>
      ) : data.userList.length == 0 ? null : (
        <div className={searchStyles.userWrap}>
          <div className={searchStyles.userInner}>
            <Swiper
              className={searchStyles.swiper}
              slidesPerView={6} //한번에 보여질 갯수
              modules={[Navigation, Mousewheel]}
              navigation={true}
              mousewheel={true}
              breakpoints={{
                1600: {
                  slidesPerView: 6, // 4 slides per view on screens >= 768px
                },
                1400: {
                  slidesPerView: 5, // 2 slides per view on screens >= 480px
                },
                1100: {
                  slidesPerView: 4,
                },
                960: {
                  slidesPerView: 3,
                },
                320: {
                  slidesPerView: 2, // 1 slide per view on screens >= 320px
                },
              }}>
              {data.userList.map(item => {
                return item.status === "deleted" ? null : (
                  <SwiperSlide key={item.userId}>
                    <div className={searchStyles.userItem}>
                      <div className={searchStyles.imgWrap}>
                        <Link to={`/user/${item.userId}`}>
                          <img
                            src={item.profileImage ? item.profileImage : null}
                          />
                        </Link>
                      </div>

                      <div className={searchStyles.nickname}>
                        <div>
                          <Dropdown className={searchStyles.dropdown}>
                            <Dropdown.Toggle variant="" id="dropdown-basic">
                              {item.nickname}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item
                                onClick={() => {
                                  navigate(`/user/${item.userId}`);
                                }}>
                                프로필 보기
                              </Dropdown.Item>

                              {isLoggedIn ? (
                                <>
                                  <Dropdown.Item
                                    onClick={e => {
                                      handleRequestFreind(e, item.userId);
                                    }}>
                                    친구요청
                                  </Dropdown.Item>

                                  <Dropdown.Item
                                    onClick={e => {
                                      handleRequestChat(e, item.userId);
                                    }}>
                                    채팅하기
                                  </Dropdown.Item>
                                </>
                              ) : (
                                <></>
                              )}
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      )}
      {data.postList.length == 0 ? null : (
    
        <div className={searchStyles.postWrap}>
              <h3>게시글 검색결과 목록</h3>
          <div className={styles.contentHeader}>
            <div className={styles.type1}>게시판</div>
            <div className={styles.type2}>제목</div>
            <div className={styles.type3}>유저 정보</div>
            <div className={styles.type4}>작성일</div>
            <div className={styles.type5}>좋아요</div>
            <div className={styles.type6}>조회수</div>
          </div>
          {data.postList.map(item => {
            const createdAt = new Date(item.createdAt);
            const now = new Date();
            const differenceInSeconds = Math.floor((now - createdAt) / 1000);
            const differenceInMinutes = Math.floor(differenceInSeconds / 60);
            const differenceInHours = Math.floor(differenceInMinutes / 60);
            const differenceInDays = Math.floor(differenceInHours / 24);

            let dateDisplay;
            if (differenceInMinutes < 60) {
              dateDisplay = `${differenceInMinutes}분 전`;
            } else if (differenceInHours < 24) {
              dateDisplay = `${differenceInHours}시간 전`;
            } else if (differenceInDays <= 7) {
              dateDisplay = `${differenceInDays}일 전`;
            } else {
              dateDisplay = createdAt.toLocaleDateString("ko-KR");
            }
            console.log(item);

            const showImg = item.content.match(
              /<img\s+[^>]*?src\s*=\s*['"]([^'"]*?)['"][^>]*?>/
            );
            const imgSrc = showImg ? showImg[1] : null;

            function removeHTMLTags(htmlString) {
              return htmlString.replace(/<[^>]*>?/gm, "");
            }
            return (
              <div className={styles.container} key={item.postId}>
                <Link
                  to={`/post/view?postId=${item.postId}`}
                  className={styles.postWrap}>
                  <div className={styles.postContent}>
                    <div className={styles.postMbti}>
                      {item.category ? item.category : "없음"}
                    </div>
                    <div className={styles.title}>
                      <div className={styles.span}>{item.title}</div>
                    </div>
                    {/* <div className={styles.content}>{removeHTMLTags(item.content)}</div> */}
                    {/* <UserDropdown item={item.User} /> */}
                    <div className={styles.nickname}>{item.User.nickname}</div>
                    <div className={styles.date}>{dateDisplay}</div>
                    <div className={styles.likes}>
                      {/* <img src={like} alt="likes" />*/} {item.like}
                    </div>
                    <div className={styles.readhit}>
                      {/* <img src={eye} alt="views" />*/} {item.readhit}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
          <Paging data={data} status={status} page={page} setPage={setPage} />
        </div>
      )}
    </div>
  );
}

export default Search;
