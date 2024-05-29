import React from "react";
import ViewContent from "../component/ViewContent";
import ViewComment from "../component/ViewComment";
import styles from "../css/postView.module.css"
import Footer from "../component/Footer";

function PostView() {

  return (
    <section className={styles.section}>
      <ViewContent/>
      <ViewComment/>
      <Footer/>
    </section>
  );
}

export default PostView;
