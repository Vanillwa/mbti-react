import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../images/areyout.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import img from "../images/MBTI.png";
import styles from "../css/FindPwd.module.css";
import {
  checkCodeFindPwd,
  emailChangedFindPwd,
  requestCodeFindPwd,
} from "../service/api/loginAPI";
import { useAuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import sweetalert from "../component/sweetalert";

function FindPwd() {
  const emailRegx =
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])";
  const emailRef = useRef();
  const [email, setEmail] = useState();
  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [checkCodeAlert, setCheckCodeAlert] = useState();
  const [code, setCode] = useState();

  const [checkCodeAlertColor, setCheckCodeAlertColor] = useState("");
  const navigate = useNavigate();

  const isInputPwd = (email) => {
    navigate("/updatepwd", { email: email });
  };

  const goMain = () => {
    navigate("/", { state: "findPwd" });
  };

  //입력한 이메일값 받아오기

  const handleEmailOnInput = (e) => {
    const input = e.target.value;
    if (input === "" || input != emailRegx) {
      setIsInputDisabled(true);
    }
  };
  // 이메일 onBlur 함수
  const handleEmailOnBlur = async (e) => {
    if (email == emailRef.current.value) {
      setEmail();
      return;
    } else {
      setEmail(e.target.value);
      setIsButtonDisabled(true);
      setCheckCodeAlert("");
      setCode("");

      const result = await emailChangedFindPwd();
    }
  };

  //이메일 인증
  const handleRequestCode = async () => {
    const email = emailRef.current.value;
    if (email === "") {
      sweetalert.warning("이메일을 입력해주세요.");
      return;
    }
    const result = await requestCodeFindPwd(email);
    if (result.message === "success") {
      sweetalert.success("인증번호가 발송되었습니다.");

      setIsInputDisabled(false);
    } else if (result.message === "noExist") {
      sweetalert.error("가입된 이메일이 아닙니다.");
    } else {
      sweetalert.error("인증번호 발송이 실패했습니다.");
    }
  };

  //인증번호
  const handleCodeOnInput = async (e) => {
    let inputCode = e.target.value;
    setCode(inputCode);
    setCheckCodeAlert("");
    if (inputCode.length == 6) {
      const result = await checkCodeFindPwd(inputCode);

      if (result.message === "success") {
        setIsButtonDisabled(false);
        setCheckCodeAlert(
          <span style={{ color: "green" }}>인증번호가 일치합니다.</span>
        );
        setCheckCodeAlertColor("is-valid");
      } else {
        setCheckCodeAlert(
          <span style={{ color: "red" }}>인증번호가 일치하지 않습니다.</span>
        );
        setCheckCodeAlertColor("is-invalid");
      }
    }
    if (inputCode.length < 6) {
      setIsButtonDisabled(true);
    }
  };

  return (
    <>
      <div className={`${styles.container} container mt-5`}>
        <div className={styles.logo}>
          <Link to="/" className="navbar-logo">
            <img src={logo} alt="로고" />
          </Link>
        </div>
        <div className={styles.card}>
          <div className="card-body">
            <form>
              <div className="text-center mb-5">
                <h2 className="fw-bold" style={{ fontSize: "40px" }}>
                  이메일 인증
                </h2>
              </div>

              <div className="col-12">
                <label htmlFor="email" className="form-label">
                  이메일
                </label>

                <div className="d-flex gap-1">
                  <input
                    ref={emailRef}
                    type="text"
                    className="form-control"
                    name="email"
                    id="email"
                    placeholder="E-mail"
                    onInput={handleEmailOnInput}
                    onBlur={handleEmailOnBlur}
                  />

                  <button
                    className={`col-2 btn btn-primary ${styles.requestBtn}`}
                    type="button"
                    onClick={handleRequestCode}
                  >
                    인증
                  </button>
                </div>
                <label className="form-label">인증번호</label>
                <div id="certification">
                  <div className="d-flex gap-2 ">
                    <input
                      disabled={isInputDisabled}
                      type="text"
                      className={`form-control ${
                        setCheckCodeAlert === "인증번호가 일치합니다."
                          ? checkCodeAlertColor
                          : checkCodeAlertColor
                      }`}
                      name="requestNum"
                      id="requestNum"
                      placeholder="인증번호"
                      onInput={handleCodeOnInput}
                      maxLength={6}
                    />
                  </div>
                  <p id="codeAlertTag" className={styles.alert}>
                    {checkCodeAlert}
                  </p>
                </div>

                <div className="col-12">
                  <button
                    onClick={isInputPwd}
                    disabled={isButtonDisabled}
                    className={`col-3 btn btn-sm btn-primary ${styles.findbtn}`}
                  >
                    확인
                  </button>
                  <button
                    onClick={goMain}
                    className={`col-3 btn btn-sm btn-primary ${styles.mainbtn}`}
                  >
                    메인으로
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
