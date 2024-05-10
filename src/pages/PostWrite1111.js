import React, { useState } from "react";
import styles from "../css/PostWrite.module.css";
import { useAuthContext } from "../context/AuthContext";
import { postPost } from "../service/api";
import { Link, useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css"
import { Container } from "react-bootstrap";

const PostWrite = () => {
  const navigate = useNavigate();

  const [mbti, setMbti] = useState(null);

  const [selectEMbti, setSelectEMbti] = useState("");
  const [selectIMbti, setSelectIMbti] = useState("");

  const [showImages, setShowImages] = useState([]);

  const [thumbnail, setThumbnail] = useState([])
  
  const handleEMbtiChange = (e) => {
    setSelectEMbti(e.target.value);
    setSelectIMbti("I게시판");
  };
  const handleIMbtiChange = (e) => {
    setSelectIMbti(e.target.value);
    setSelectEMbti("E게시판");
  };
  const { memoUserInfo } = useAuthContext();
  const { isLoggedIn, userInfo } = memoUserInfo;

  const handleMbtiClick = (e) => {
    if (e.target.value == "E게시판") {
      setMbti(null);
    } else if (e.target.value == "I게시판") {
      setMbti(null);
    } else {
      setMbti(e.target.value);
    }
  };
  const handleAddImages = (event) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file' );
    input.setAttribute('accept', 'image/*');
    input.click(); // 에디터 이미지버튼을 클릭하면 이 input이 클릭된다.

    input.addEventListener('change',(e)=>{
      const file = e.target.files[0];
      console.log('이미지 저장' ,file )
      const imgURL = URL.createObjectURL(file);
      setThumbnail((pre)=>[...pre, imgURL])
    })
  };


  


  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      title: e.target.title.value,
      content: e.target.title.value,
      category: mbti,
    };
    const result = await postPost(body);

    if (result.message == "success") {
      alert("작성완료");
      navigate("/post/list");
    }
  };
  if (!isLoggedIn) {
    return (
      <>
        <h2>로그인 후 이용 가능한 컨텐츠입니다</h2>
        <Link to="/">로그인 하러가기</Link>
        <br />
        <Link to="/post/list">게시판으로 가기</Link>
      </>
    );
  }


  return (
    <>
      <div className={styles.container}>
        {mbti == null ? (
          <h3>전체 게시판에 글쓰기</h3>
        ) : (
          <h3>{mbti} 게시판에 글쓰기</h3>
        )}
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.selectBox}>
            <div className={styles.selectTitle}>게시판 선택하기</div>
            <div>
            <select
              onChange={handleEMbtiChange}
              value={selectEMbti}
              onClick={handleMbtiClick}
              className={styles.mbtiSelectE}
              id="E"
            >
              <option>E게시판</option>
              <option value="ESTJ">ESTJ</option>
              <option value="ESTP">ESTP</option>
              <option value="ESFJ">ESFJ</option>
              <option value="ESFP">ESFP</option>
              <option value="ENTJ">ENTJ</option>
              <option value="ENTP">ENTP</option>
              <option value="ENFJ">ENFJ</option>
              <option value="ENFP">ENFP</option>
            </select>
            <select
              onChange={handleIMbtiChange}
              value={selectIMbti}
              onClick={handleMbtiClick}
              className={styles.mbtiSelectI}
              id="I"
            >
              <option>I게시판</option>
              <option value="ISTJ">ISTJ</option>
              <option value="ISTP">ISTP</option>
              <option value="ISFJ">ISFJ</option>
              <option value="ISFP">ISFP</option>
              <option value="INTJ">INTJ</option>
              <option value="INTP">INTP</option>
              <option value="INFJ">INFJ</option>
              <option value="INFP">INFP</option>
            </select>
            </div>
          </div>
          <div className={styles.titleBox}>
            <input
              className={styles.titleInput}
              type="text"
              name="title"
              placeholder="제목 입력"
              required
            />
          </div>
          <button onClick={handleAddImages} type="button">add image</button>
          <div className={styles.imageWrap}>

            {thumbnail.map((item)=>{
              return(
                <div className={styles.imgBox}><img className={styles.showImg} src={item}/></div>
              )
            })}
          </div>

          
          
          <div className={styles.contentBox}>
            <textarea
              className={styles.textarea}
              type="text"
              name="content"
              placeholder="내용 입력"
             
              required
            />
          </div>
          
          <button type="submit" className={styles.submitBtn}>
            작성하기
          </button>
        </form>
      </div>
    </>
  );
};

export default PostWrite;
