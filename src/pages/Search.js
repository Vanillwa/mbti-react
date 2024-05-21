import { useQuery } from "react-query";
import { getSearchResult } from "../service/api/searchAPI";
import { Link, useLocation } from "react-router-dom";
import searchStyles from "../css/Search.module.css";
import styles from "../css/PostList.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import UserDropdown from "../component/userDropdown";
import like from "../svg/like.svg";
import eye from "../svg/eye.svg";
import Paging from "../component/Paging";
import { useEffect, useState } from "react";
function Search( ) {
  const location = useLocation();
  const keyword = location.state.keyword;
  const [page, setPage] = useState(1);
  const [size,setSize] = useState(5);
  const { data, status } = useQuery(
    ["getSearchResult", keyword,page,size],
    () => getSearchResult(keyword,page,size),
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
    useEffect(()=>{
      setPage(1)
    },[keyword])

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
  console.log(data);
  return (
    <div>
      {data.userList.length == 0 && data.postList.length == 0 ? (
        <div>검색 결과가 없습니다.</div>
      ) : data.userList.length == 0 ? null : (
        <div className={searchStyles.userWrap}>
          <div className={searchStyles.userInner}>
            <Swiper
              slidesPerView={6} //한번에 보여질 갯수
              modules={[Navigation]}
              navigation={true}
              breakpoints={{
                
                1600: {
                  slidesPerView: 6, // 4 slides per view on screens >= 768px
                },
                1400: {
                  slidesPerView: 5, // 2 slides per view on screens >= 480px
                },
                1100:{
                  slidesPerView: 4
                },
                960:{
                  slidesPerView:3
                },
                320: {
                  slidesPerView: 2, // 1 slide per view on screens >= 320px
                },
              }}>
              {data.userList.map(item => {
                console.log("userItem:",item)
                return (
                  <SwiperSlide>
                   <p>{item.nickname}의 검색결과</p>
                    <div className={searchStyles.userItem}>
                      <div className={searchStyles.imgWrap}>
                        <img src={item.profileImage ? item.profileImage : null} />
                      </div>
                      <div className={searchStyles.nickname}>{item.nickname}</div>
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
          
            const showImg = item.content.match(
              /<img\s+[^>]*?src\s*=\s*['"]([^'"]*?)['"][^>]*?>/
            );
            const imgSrc = showImg ? showImg[1] : null;
            return (
              <div className={`${styles.container} container`} key={item.postId}>
            <Link
            
              to={`/post/view?postId=${item.postId}`}
              className={`${styles.postWrap} row-cols-2`}
              
            >
              <div className={`${styles.postContent} col-8`}>
                
                <div className={styles.header}>
                
                  <UserDropdown item={item.User}/>
                  <div className={`${styles.title} col-4`}>{item.title}</div>
                </div>
                <div className={`${styles.readhitBox}`}>
                  <div className={styles.date}>
                    {dateDisplay}
                  </div>
                  
                  <div className={styles.likes}>
                    <img src={like} /> {item.like}
                  </div>
                  <div className={styles.readhit}>
                    <img src={eye} /> {item.readhit}
                  </div>
                </div>
              </div>
              <div className={`${styles.imgBox} col-4`}>
                <div className={styles.thumbnail}>
                  <img className={styles.img} src={imgSrc} />
                </div>
              </div>
            </Link>
          </div>
            )
          })}
          <Paging data={data} status={status} page={page} setPage={setPage}  />
        </div>
      )}
    </div>
  );
}

export default Search;
