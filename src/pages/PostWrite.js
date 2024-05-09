import React, { useMemo, useRef, useState } from "react";
import styles from "../css/PostWrite.module.css";
import { useAuthContext } from "../context/AuthContext";
import { postPost } from "../service/api";
import { Link, useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import ReactQuill from "react-quill";
import sweetalert from "../component/sweetalert";

const PostWrite = () => {
  const navigate = useNavigate();

  const [mbti, setMbti] = useState(null);

  const [selectEMbti, setSelectEMbti] = useState("");
  const [selectIMbti, setSelectIMbti] = useState("");

  const [value, setValue] = useState("");
  const quillRef = useRef();


  const imageHandler = () => {
    console.log('에디터에서 이미지 버튼을 클릭하면 이 핸들러가 시작됩니다!');
  
    // 1. 이미지를 저장할 input type=file DOM을 만든다.
    const input = document.createElement('input');
    // 속성 써주기
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click(); // 에디터 이미지버튼을 클릭하면 이 input이 클릭된다.

    input.addEventListener('change', async () => {
      console.log('온체인지');
      const file = input.files[0];
      // multer에 맞는 형식으로 데이터 만들어준다.
      const formData = new FormData();
      formData.append('img', file); // formData는 키-밸류 구조
      // 백엔드 multer라우터에 이미지를 보낸다.
      try {
        const result = await axios.post('https://192.168.5.17:10000/api/post/img', formData);
        console.log('성공 시, 백엔드가 보내주는 데이터', result.data.url);
        const IMG_URL = result.data.url;

        const editor = quillRef.current.getEditor(); // 에디터 객체 가져오기

        const range = editor.getSelection();
        // 가져온 위치에 이미지를 삽입한다
        editor.insertEmbed(range.index, 'image', IMG_URL);
      } catch (error) {
        console.log('실패했어요ㅠ');
      }
    });
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          ['image'],
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        ],
        handlers: {
          // 이미지 처리는 우리가 직접 imageHandler라는 함수로 처리할 것이다.
          image: imageHandler,
        },
      },
    };
  }, []);
  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'image',
  ];

  

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const alertResult = await sweetalert.question('정말 작성하시겠습니까?' ,'' , '네', '아니오')
    if(alertResult.dismiss){
      return;
    }
    const body = {
      title: e.target.title.value,
      content: value,
      category: mbti,
    };
    const result = await postPost(body);
    
    if (result.message == "success") {
      sweetalert.success('작성 완료', '3초 후에 자동으로 닫힙니다.', '확인',)

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
          <div className={styles.contentBox}>
          <ReactQuill
            ref={quillRef}
            theme="snow"
            placeholder="내용입력해줘"
            value={value}
            onChange={setValue}
            modules={modules}
            formats={formats}
            className={styles.editorBox}
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
