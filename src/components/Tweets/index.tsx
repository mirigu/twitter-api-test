import React from "react";
import styles from "../../../styles/Home.module.css";

const Tweets = () => {
  const netflixURL = "https://twitter.com/NetflixKR";
  const postURL = "https://twitter.com/NetflixKR/status/1586281688572665856";
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        Welcome to <a href="https://twitter.com/NetflixKR">Netflix Korea</a>
      </h1>
      <p className={styles.description}>
        <code className={styles.code}>{netflixURL}</code>
      </p>
      <p className={styles.description}>
        <code className={styles.code}>{postURL}</code>
      </p>
      <div className={styles.grid}>
        <button className={styles.card} name="isFollow">
          <h2></h2>
        </button>
        <button className={styles.card} name="isLike">
          <h2></h2>
        </button>
        <button className={styles.card} name="isRetweet">
          <h2></h2>
        </button>
      </div>
      <div className={styles.grid}>
        <button className={styles.card}>
          <h2>로그아웃</h2>
        </button>
      </div>
    </main>
  );
};

export default Tweets;
