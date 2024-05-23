import React from "react";
import ViewContent from "../component/ViewContent";
import ViewComment from "../component/ViewComment";
import styles from "../css/postView.module.css"

function PostView() {

  return (
    <section className={styles.section}>
      <ViewContent/>
      <ViewComment/>
    </section>
  );
}

export default PostView;
