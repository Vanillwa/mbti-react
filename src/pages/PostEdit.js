import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "../css/PostWrite.module.css";
import { useAuthContext } from "../context/AuthContext";
import { getPostView, postEdit} from "../service/api";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import ReactQuill from "react-quill";
import { useQuery } from "react-query";

const PostEdit = () => {
  const navigate = useNavigate();
  

  const [query, setQuery] = useSearchParams();
  const postId = query.get("postId");

  const { data, status } = useQuery(
    ["getPostEdit", postId],
    () => getPostView(postId),
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
  const [mbti, setMbti] = useState(null);

  const [selectEMbti, setSelectEMbti] = useState("");
  const [selectIMbti, setSelectIMbti] = useState("");

  const [titleValue , setTitleValue] = useState('')
  const [value, setValue] = useState("");
  const quillRef = useRef();

  useEffect(()=>{
    if(status == "success" && data && data.content && data.title){
      setValue(data.content)
      setTitleValue(data.title)
      setMbti(data.category)
    }
  }, [status])


  const imageHandler = () => {
    console.log('에디터에서 이미지 버튼을 클릭하면 이 핸들러가 시작됩니다!');

    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.addEventListener('change', async () => {
      console.log('온체인지');
      const file = input.files[0];

      const formData = new FormData();
      formData.append('img', file);
      try {
        const result = await axios.post('https://192.168.5.17:10000/api/post/img', formData);
        console.log('성공 시, 백엔드가 보내주는 데이터', result.data.url);
        const IMG_URL = result.data.url;

        const editor = quillRef.current.getEditor();

        const range = editor.getSelection();
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
  
  console.log(data)

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

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const body = {
      title: e.target.title.value,
      content: value,
      category: mbti,
      writerId : data.writerId,
      postId : data.postId
    };
    const result = await postEdit(body);

    if (result.message == "success") {
      alert("수정완료");
      navigate(`/post/view?postId=${postId}`);
    }else if(result.message == 'noAuth'){
      console.log('권한 없음')
    }else{
      console.log('왜그러냐')
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
        <form className={styles.form} onSubmit={handleEditSubmit}>
          <div className={styles.selectBox}>
            <div className={styles.selectTitle}>게시판 선택하기</div>
            <div>
            <select
              onChange={handleEMbtiChange}
              value={selectEMbti}
              defaultValue={data ? data.category : null}
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
              defaultValue={data ? data.category : null}
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
              defaultValue={titleValue}
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
            수정하기
          </button>
        </form>
      </div>
    </>
  );
};

export default PostEdit;
