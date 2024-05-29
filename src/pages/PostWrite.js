import React, { useMemo, useRef, useState } from "react";
import styles from "../css/PostWrite.module.css";
import { useAuthContext } from "../context/AuthContext";
import { postPost } from "../service/api/postAPI";
import { Link, useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import ReactQuill, { Quill } from "react-quill";
import sweetalert from "../component/sweetalert";
import ImageResize from "quill-image-resize-module-react";
import 'cropperjs/dist/cropper.css';
import { Cropper } from 'react-cropper';
import Modal from 'react-modal';
import Footer from "../component/Footer";

Quill.register("modules/imageResize", ImageResize);

const PostWrite = () => {
  const navigate = useNavigate();

  const [mbti, setMbti] = useState(null);
  const [selectEMbti, setSelectEMbti] = useState("");
  const [selectIMbti, setSelectIMbti] = useState("");
  const [value, setValue] = useState("");
  const quillRef = useRef();
  const [croppedImage, setCroppedImage] = useState(null);
  const [cropper, setCropper] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const imageInputRef = useRef(null);

  const imageHandler = () => {
    const input = imageInputRef.current;
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.addEventListener("change", () => {
      const file = input.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setCroppedImage(reader.result);
          setIsModalOpen(true);
          // Clear the input value to allow re-selection of the same file
          input.value = '';
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleCrop = async (e) => {
    e.preventDefault();
    if (cropper) {
      cropper.getCroppedCanvas().toBlob(async (blob) => {
        const formData = new FormData();
        formData.append('img', blob);
        try {
          const result = await axios.post("https://192.168.5.17:10000/api/post/img", formData);
          const IMG_URL = result.data.url;
          const editor = quillRef.current.getEditor();
          const range = editor.getSelection();
          editor.insertEmbed(range.index, "image", IMG_URL);
          setCroppedImage(null);
          setIsModalOpen(false);
        } catch (error) {
          console.log("Image upload failed", error);
        }
      }, 'image/png');
    }
  };

  const cancelCrop = () => {
    setCroppedImage(null);
    setIsModalOpen(false);
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          ["image"],
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      imageResize: {
        parchment: Quill.import("parchment"),
        modules: ["Resize", "DisplaySize", "Toolbar"],
      },
    };
  }, []);

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "image",
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
    if (e.target.value === "E게시판" || e.target.value === "I게시판") {
      setMbti(null);
    } else {
      setMbti(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const alertResult = await sweetalert.question(
      "정말 작성하시겠습니까?",
      "",
      "네",
      "아니오"
    );
    if (alertResult.dismiss) {
      return;
    }
    const body = {
      title: e.target.title.value,
      content: value,
      category: mbti,
    };
    const result = await postPost(body);
    console.log(result)
    if (result.message === "success") {
      sweetalert.success("작성 완료", "3초 후에 자동으로 닫힙니다.", "확인");
      navigate(`/post/view?postId=${result.result.postId}`);
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
              placeholder="내용 입력해줘"
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

        {/* Modal for cropping image */}
        <Modal 
          isOpen={isModalOpen} 
          onRequestClose={cancelCrop} 
          contentLabel="Image Cropper" 
          className={styles.modal}
          overlayClassName={styles.overlay}
        >
          {/* 크롭창 수정할거면 여기 건들면됨. */}
          <div className={styles.cropperWrapper}>
            <Cropper
              style={{ height: 450, width: '100%' }}
              src={croppedImage}
              viewMode={1}
              guides={true}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={true}
              responsive={true}
              autoCropArea={0.8}  
              checkOrientation={false}
              onInitialized={(instance) => {
                setCropper(instance);
                // 크롭박스 크기 설정하는곳
                instance.setCropBoxData({
                  width: 200,
                  height: 200,
                });
              }}
            />
            <div className={styles.cropperButtonWrapper}>
              <button type="button" className={`${styles.cropButton} btn btn-primary`} onClick={handleCrop}>업로드</button>
              <button type="button" className={`${styles.cancelButton} btn btn-primary`} onClick={cancelCrop}>뒤로가기</button>
            </div>
          </div>
        </Modal>

        {/* Hidden file input element */}
        <input
          type="file"
          accept="image/*"
          ref={imageInputRef}
          style={{ display: "none" }}
        />
      </div>
      <Footer/>
    </>
  );
};

export default PostWrite;
