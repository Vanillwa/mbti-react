import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../images/logo.avif";
import { Link } from "react-router-dom";
import img from "../images/MBTI.png";
import styles from "../css/FindPwd.module.css";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckpassword] = useState("");
  const [checkCodeAlert, setCheckCodeAlert] = useState();
  const [isSame, setIsSame] = useState(true);
  

  const handleInputPassword = e => {
    const input = e.target.value;
    setPassword(input);
   
  };

  const handleCheckInputPassword = e => {
    const input = e.target.value;
    setCheckpassword(input);
    
  };
  const ComparePassword = () => {
    if (password === "") {
        setCheckCodeAlert("")
        setIsSame(true); 
      return;
    }
    if (checkPassword === "") {
        setCheckCodeAlert("")
        setIsSame(true);
      return;
    }

    if (password === checkPassword) {
        setCheckCodeAlert("비밀번호와 비밀번호 확인이 일치합니다.")
      setIsSame(false);
    } else {
        setIsSame(true);
      setCheckCodeAlert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
    }
  };
useEffect(()=>{
    ComparePassword()
},[password,checkPassword])
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
                <p> {checkCodeAlert}</p>
                <div className="col-12">
                    
                  <button
                    disabled={isSame}   
                class="col-3 btn btn-sm btn-primary">
                    재설정하기
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
