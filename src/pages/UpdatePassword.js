import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../images/logo.avif";
import { Link } from "react-router-dom";
import img from "../images/MBTI.png";
import styles from "../css/ResetPwd.module.css";
import { useNavigate } from "react-router";
import { requestUpdatePwd } from "../service/api";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckpassword] = useState("");
  const [checkCodeAlert, setCheckCodeAlert] = useState();
  const [isSame, setIsSame] = useState(false);
  const [regxAlert ,setRegxAlert] = useState('');
  const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*()_-]{6,20}$/
                        
  const cancelBtn = () => {
    navigate("/findpwd");
  };

  const handleInputPassword = e => {
    const input = e.target.value;
    setPassword(input);
    if(!passwordRegex.test(input) ){
     return  setRegxAlert(" 숫자와  영어가 있어야 하며 총 길이가 6에서 20 사이여야 합니다.")    
     }else{
      setRegxAlert("올바른 형식입니다.")
     }
  };

  const handleCheckInputPassword = e => {
    const input = e.target.value;
    setCheckpassword(input);
  };
  const ComparePassword = () => {
    if (password === "") {
      setCheckCodeAlert("");
      setIsSame(false);
      return;
    }
    if (checkPassword === "") {
      setCheckCodeAlert("");
      setIsSame(false);
      return;
    }

    if (password === checkPassword ) {
      setCheckCodeAlert("비밀번호와 비밀번호 확인이 일치합니다.");
      setIsSame(true);
    } else {
      setIsSame(false);
      setCheckCodeAlert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
    }
  };
  useEffect(() => {
    ComparePassword();
  }, [password, checkPassword]);

  //비밀번호 재설정클릭시
  const navigate = useNavigate();

  const UpdatePwd = async () => {
    


    const result = await requestUpdatePwd(password);
    console.log(result.message);
    console.log(result);
    if (result.message === "success") {
      alert("비밀번호 변경 완료.");
      navigate("/");
    } else {
      alert("에러 발생");
    }
  };

  return (
    <>
      <div className="container mt-5">
        <Link to="/" className="navbar-logo d-flex justify-content-center">
          <img src={logo} alt="로고" className={styles.logo} />
        </Link>
        <div className={styles.card}>
          <div className="card-body">
            <form>
              <div className="text-center mb-5">
                <img src={img} alt="회원사진" className={styles.mbtiImg} />
                <h2 className="fw-bold" style={{ fontSize: "40px" }}>
                  비밀번호 재설정
                </h2>
              </div>

              <div className="col-12">
                <label htmlFor="password" className="form-label">
                  비밀번호
                </label>

                <div className="d-flex gap-1">
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    id="password"
                    placeholder="Password"
                    onInput={handleInputPassword}
                  />
                </div>
                <p className={styles.regxAlert}>{regxAlert}</p>
                <label className="form-label">비밀번호 확인</label>
                <div id="certification">
                  <div className="d-flex gap-2 ">
                    <input
                      type="password"
                      className="form-control"
                      name="checkPassword"
                      id="checkPassword"
                      placeholder="CheckPassword"
                      onInput={handleCheckInputPassword}
                    />
                  </div>
                </div>
                <p className={styles.alert}> {checkCodeAlert}</p>
                <div className="col-12">
                  <button
                    type="button"
                    disabled={!isSame}
                    onClick={UpdatePwd}
                    class="col-3 btn btn-sm btn-primary">
                    재설정하기
                  </button>
                  <button
                    onClick={cancelBtn}
                    class={`col-3 btn btn-sm btn-primary ${styles.cancelbtn}`}>
                    취소
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

export default ResetPassword;
