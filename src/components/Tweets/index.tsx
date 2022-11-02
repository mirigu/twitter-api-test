import React from "react";
// redux
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { getUserInfo } from "../../redux/modules/twitter/action";
// cookie
import { getCookie } from "../../utils/cookie";
// func
import { replaceTarget } from "../../utils/replaceTarget";
// css
import styles from "../../../styles/Home.module.css";

const Tweets = () => {
  const dispatch = useAppDispatch();
  // 넷플릭스 트위터 주소
  const netflixURL = "https://twitter.com/NetflixKR";
  // 넷플릭스 좋아요,리트윗 할 게시물 주소
  const postURL = "https://twitter.com/NetflixKR/status/1586281688572665856";
  // 대상 트위터 이름
  const targetName = replaceTarget(netflixURL);
  // 대상 트위터 게시물 아이디
  const targetPostID = replaceTarget(postURL);

  const { user } = useAppSelector((state) => state.twitter);

  React.useEffect(() => {
    if (getCookie("token") !== undefined) {
      // 토큰 있으면 유저 정보 가져오기
      dispatch(getUserInfo());
    }
    return;
  }, [dispatch]);

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
      {user && (
        <p className={styles.description}>
          <code className={styles.code}>{user.id}</code>
          <code className={styles.code}>{user.name}</code>
          <code className={styles.code}>{user.username}</code>
        </p>
      )}
      <div className={styles.grid}>
        <button className={styles.card} name="isFollow">
          <h2>팔로우</h2>
        </button>
        <button className={styles.card} name="isLike">
          <h2>좋아요</h2>
        </button>
        <button className={styles.card} name="isRetweet">
          <h2>리트윗</h2>
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
