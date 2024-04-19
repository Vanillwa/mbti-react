import { Container } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import styles from '../css/UpdatePwd.module.css'
import Lock from '../images/UpdatePwd/lock-fill.svg'
function UpdatePwd(){
    const Navigate = useNavigate();
    const GoLogin =()=>{
        Navigate("/")
    }
    return(
        <div >
            <Container className={styles.con}>
                <div className={styles.img}>
                <img src={Lock}></img>
                </div>
           <div className={styles.info}>
            <p>비밀번호 변경이 완료되었습니다.</p>
            <p>새로운 비밀번호로 로그인해주세요.</p>
            </div>
            <div>
            <button className={styles.btn} onClick={GoLogin}>로그인하기</button>
            </div>
            </Container>
        </div>
    )
}

export default UpdatePwd