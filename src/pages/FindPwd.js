import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../images/logo.avif";
import { Link } from "react-router-dom";
import img from "../images/MBTI.png";
import styles from "../css/FindPwd.module.css";
import { checkCodeFindPwd, requestCodeFindPwd } from "../service/api";

function FindPwd() {
  const [email, setEmail] = useState("");
  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [checkCodeAlert, setCheckCodeAlert] = useState();

  const handleFindPwd = async () => { };

  //입력한 이메일값 받아오기
  const handleOnInput = e => {
    const input = e.target.value;
    console.log(input);
    setEmail(input);
  };

  //이메일 인증
  const handleRequestCode = async () => {
    if (email === "") return;
    const result = await requestCodeFindPwd(email);
    console.log(result.message);

    if (result.message === "success") {
      alert("인증번호가 발송되었습니다.");
      setIsInputDisabled(false);
      console.log(result.code);
    } else if (result.message === "noExist") {
      alert("가입된 이메일이 아닙니다.");
    } else {
      alert("인증번호 발송이 실패했습니다.");
    }
  };
  
  //인증번호
  const handleOnRequest = async (e) => {
    const input = e.target.value;

    if (input.length == 6) {
      const result = await checkCodeFindPwd(input);
      console.log(result)
      if (result.message === "success") {
        setIsButtonDisabled(false);
      } else {
        setCheckCodeAlert("인증번호가 올바르지 않습니다.");

      }
    }
  };
  return (
    <>
      <div className="container mt-5">
        <Link to="/" className="navbar-logo d-flex justify-content-center">
          <img src={logo} alt="로고" className="logo" />
        </Link>
        <div className={styles.card}>
          <div className="card-body">
            <form>
              <div className="text-center mb-5">
                <img src={img} alt="회원사진" className="user-image" />
                <h2 className="fw-bold" style={{ fontSize: "40px" }}>
                  비밀번호찾기
                </h2>
              </div>

              <div className="col-12">
                <label htmlFor="email" className="form-label">
                  이메일
                </label>

                <div className="d-flex gap-1">
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    id="email"
                    placeholder="E-mail"
                    onInput={handleOnInput}
                  />

                  <button type="button" onClick={handleRequestCode}>
                    인증
                  </button>
                </div>
                <label className="form-label">인증번호</label>
                <div id="certification">
                  <div className="d-flex gap-2 ">
                    <input disabled={isInputDisabled} type="text"
                      className="form-control"
                      name="requestNum"
                      id="requestNum"
                      placeholder="인증번호"
                      onInput={handleOnRequest}
                    />
                  </div>
                  <p className={styles.alert}>{checkCodeAlert}</p>
                </div>

                <div className="col-12">
                  <button
                    disabled={isButtonDisabled}
                    className="col-3 btn btn-sm btn-primary">
                    비밀번호 찾기
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default FindPwd;
