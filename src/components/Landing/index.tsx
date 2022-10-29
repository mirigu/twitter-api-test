import Head from "next/head";
import React from "react";
import styles from "../../../styles/Home.module.css";
import { authClient, STATE } from "../../pages";

const Landing = () => {
  const authUrl = authClient.generateAuthURL({
    state: STATE,
    code_challenge_method: "s256",
  });

  return (
    <div className={styles.container}>
      <Head>
        <title></title>
        <meta name="Twitter API Test" content="Twitter API Test" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          <a>Twitter</a> API Test
        </h1>
        <p className={styles.description}>
          <code className={styles.code}>
            <a>Twitter API Test</a>
          </code>
        </p>
        <div className={styles.grid}>
          <a href={authUrl} className={styles.card}>
            <h2>Login</h2>
          </a>
        </div>
      </main>
    </div>
  );
};

export default Landing;
