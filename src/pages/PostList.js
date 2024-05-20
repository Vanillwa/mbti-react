import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { getPostList } from "../service/api/postAPI";
import PostItems from "../component/PostItems";
import styles from "../css/PostList.module.css";

import Paging from "../component/Paging";
import { Form } from "react-bootstrap";

const PostList = () => {
  const [query, setQuery] = useSearchParams();
  const mbti = query.get("mbti");

  const readPage = parseInt(query.get('page') || '1', 10)

  const [page, setPage] = useState(readPage);
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
  useEffect(()=>{
    setQuery({page, mbti})
  }, [page, mbti])

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
  }
  return (
    <div className={styles.postBox}>
      {mbti == 'null' ? <h2>전체게시판</h2> : <h2>{mbti}게시판</h2>}
      <div className={styles.sortBox}>
      <Form.Select aria-label="Default select example" onChange={handleSortChange}>
        <option value='createdAt' >날짜순</option>
        <option value="readhit">조회순</option>
        <option value="like">좋아요순</option>
      </Form.Select>
      <Form.Select aria-label="Default select example" onChange={handleOrderChange}>
        {sort == 'createdAt' ? <><option>최신순</option>
        <option>오래된순</option></> : <><option>많은순</option><option>적은순</option></>}
      </Form.Select>
      </div>
      <PostItems data={data} status={status} />
      {data?.list?.length == 0 ? null : <Paging data={data} status={status} page={page} setPage={setPage}/>}
      
    </div>
  );
};

export default PostList;
