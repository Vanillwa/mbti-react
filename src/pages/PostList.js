import React, { useState } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { getPostList } from "../service/api";
import PostItems from "../component/PostItems";
import styles from "../css/PostList.module.css";

import Paging from "../component/Paging";

const PostList = () => {
  const [query, setQuery] = useSearchParams();
  const mbti = query.get("mbti");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [sort, setSort] = useState("createdAt");
  const [order, setOrder] = useState("desc");

  const { data, status } = useQuery(
    ["getPostList", mbti, size, sort, order, page],
    () => getPostList(mbti, size, sort, order, page),
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  const handleSortChange = (e) => {
    e.preventDefault()
    if(e.target.value == 'readhit'){
      setSort('readhit');
    }else if(e.target.value == 'like'){
      setSort('like')
    }else if (e.target.value == 'createdAt'){
      setSort('createdAt')
    }
    
  };
  const handleOrderChange = (e)=>{
    const orderValue = e.target.value
    if(orderValue == '최신순' || orderValue == '많은순'){
      setOrder('desc')
    }else{
      setOrder('asc')
    }
    console.log(order)
  }

  return (
    <div className={styles.postBox}>
      <div className="d-flex">
      <select  onChange={handleSortChange} >
        <option value='createdAt' >날짜순</option>
        <option value="readhit">조회순</option>
        <option value="like">좋아요순</option>
      </select>
      <select onChange={handleOrderChange}>
        {sort == 'createdAt' ? <><option>최신순</option>
        <option>오래된순</option></> : <><option>많은순</option><option>적은순</option></>}
        
      </select>
      </div>
      <PostItems data={data} status={status} />

      <Paging data={data} status={status} page={page} setPage={setPage}/>

    </div>
  );
};

export default PostList;
