import { Pagination } from "react-bootstrap";

function PostPagination({data, status, page, setPage}){
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

  const {startPage, lastPage, totalPage} = data.paging
  let array = [...Array(lastPage - startPage +1 )]
  const handlePageClick = (number)=>{
    setPage(number)
  }

  
  return(
    <>
      <Pagination>
      <Pagination.First onClick={()=>setPage(1)} disabled={page == 1}/>
      <Pagination.Prev onClick={()=>setPage(Math.max(1, page - 1))} disabled={page == 1}/>
      {array.map((_, i)=>{
        return(
            <Pagination.Item key={i} className={page == startPage + i ? 'active' : null} onClick={()=>handlePageClick(startPage + i)}>{startPage + i}</Pagination.Item>
        )
      })}
      <Pagination.Next onClick={()=>setPage(Math.min(totalPage, page + 1))} disabled={page == totalPage}/>
      <Pagination.Last onClick={()=>setPage(totalPage)} disabled={page == totalPage}/>
    </Pagination>
    
    </>
  )
}

export default PostPagination