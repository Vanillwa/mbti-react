import lock from '../svg/lock-fill.svg'
import styles from '../css/CompleteLogin.module.css'
function CompleteLogin(){
    return(
        <div className={styles.body}>
        <div className={styles.compleLogin}>
            <img  src={lock}></img>
            <p>로그인에 성공했습니다.</p>
            <p>다양한 글을 작성해보세요!</p>
            <button type="button" onClick={() => window.location.href="/post/list"} >게시판 이동</button>
        </div>
        </div>
    )
}

export default CompleteLogin;