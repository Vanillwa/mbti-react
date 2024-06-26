import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../images/areyout.png";
import { Link } from "react-router-dom";
import styles from "../css/UpdatePwd.module.css";
import { useNavigate } from "react-router";
import { requestUpdatePwd } from "../service/api/loginAPI";
import sweetalert from "../component/sweetalert";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckpassword] = useState("");
  const [checkCodeAlert, setCheckCodeAlert] = useState();
  const [isSame, setIsSame] = useState(false);
  const [regxAlert, setRegxAlert] = useState("");
  const [checkRegx, setCheckRex] = useState(false);
  const [regxAlertColor,setRegxAlertColor] =useState('')
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*()_-]{6,20}$/;

  const cancelBtn = () => {
    navigate("/findpwd");
  };
//비밀번호의 onInput 함수
  const handleInputPassword = e => {
    const input = e.target.value;
    setPassword(input);

 if (password === "" || !passwordRegex.test(input)) {
      setCheckRex(false);
    
    }

    if (!passwordRegex.test(input) || 5 >= input.length > 20) {
      setRegxAlert(<span style={{color:"red"}}> " 숫자와  영어가 있어야 하며 총 길이가 6자에서 20자 사이여야 합니다."</span>   
      
      );
      setIsSame(false);
        
    } else {
      setCheckRex(true);
      setRegxAlert(<span style={{color:"green"}}>"올바른 형식입니다."</span>);
    }
  };
//비밀번호 확인의 onInput 함수
  const handleCheckInputPassword = e => {
    const input = e.target.value;
    setCheckpassword(input);
  };
 

//비밀번호 검증
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
    if (password.length < 6 || password.length > 20) {
      setIsSame(false);
    }
     else if (password === checkPassword) {
      setCheckCodeAlert(<span style={{color:"green"}}>"비밀번호와 비밀번호 확인이 일치합니다."</span>);
      setIsSame(true);
      setRegxAlertColor('is-valid')

    } else if (password != checkPassword) {
      setIsSame(false);
      setCheckCodeAlert(<span style={{color:"red"}}>"비밀번호와 비밀번호 확인이 일치하지 않습니다."</span>);
      setRegxAlertColor('is-invalid')
    }
  };
  useEffect(() => {
    ComparePassword();
  }, [password, checkPassword]);

  //비밀번호 재설정클릭시
  const navigate = useNavigate();

  const UpdatePwd = async () => {
    const result = await requestUpdatePwd(password);
    if (result.message === "success") {
      sweetalert.success('비밀번호 변경완료')
      
      navigate("/", { state: "updatePwd" });
    } else {
      sweetalert.error('에러발생')
    }
  };

  return (
    <>
      <div className={`container mt-5 ${styles.container}`}>
        <div className={` ${styles.logoBox}`}>
        <Link to="/" >
          <img src={logo} alt="로고" className={styles.logo} />
        </Link>
        </div>
        <div className={styles.card}>
          <div className="card-body">
            <form>
              <div className="text-center mb-5">
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
                    className={`form-control ${setCheckCodeAlert === "비밀번호와 비밀번호 확인이 일치합니다."?regxAlertColor : regxAlertColor}`}
                    name="password"
                    id="password"
                    placeholder="Password"
                    onInput={handleInputPassword}
                    maxLength={20}
                  
                  />
                </div>
                <p className={styles.regxAlert}>{regxAlert}</p>
                <label className="form-label">비밀번호 확인</label>
                <div id="certification">
                  <div className="d-flex gap-2 ">
                    <input
                      disabled={!checkRegx}
                      type="password"
                      className={`form-control ${setCheckCodeAlert === "비밀번호와 비밀번호 확인이 일치합니다."?regxAlertColor : regxAlertColor}`}
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
                    className="col-3 btn btn-sm btn-primary">
                    재설정하기
                  </button>
                  <button
                    onClick={cancelBtn}
                    className={`col-3 btn btn-sm btn-primary ${styles.cancelbtn}`}>
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
