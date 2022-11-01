import express from "express";
import cors from "cors";
import { auth, Client } from "twitter-api-sdk";
// componenets
import Landing from "../components/Landing";
// types
import type { NextPage } from "next";

const app = express();

export const STATE = "api-test";
export let authClient = new auth.OAuth2User({
  client_id: process.env.NEXT_PUBLIC_TWITTER_API_KEY as string,
  client_secret: process.env.NEXT_PUBLIC_TWITTER_API_SECRET_KEY as string,
  callback: process.env.NEXT_PUBLIC_TWITTER_API_URI as string,
  scopes: [
    "users.read",
    "tweet.read",
    "tweet.write",
    "follows.read",
    "follows.write",
    "like.read",
    "like.write",
    "offline.access",
  ],
});

const Home: NextPage = () => {
  return <Landing />;
};

export default Home;

export function getStaticProps() {
  const client = new Client(authClient);

  app.use(express.json());
  app.use(cors());

  // 코드 값 받고 토큰 넘겨주기
  app.post("/callback", async function (req: any, res: any) {
    try {
      const { code } = req.body;
      const token = await authClient.requestAccessToken(code as string);
      res.send(token);
    } catch (error) {
      console.log(error);
    }
  });

  // 사용자 정보 가져오기
  app.get("/user/info", async function (req, res) {
    try {
      const response = await client.users.findMyUser();
      res.send({ user: response.data });
    } catch (error) {
      console.log(error);
    }
  });

  // 트위터 팔로우, 좋아요, 리트윗 대상 정보 가져오기
  app.post("/target/info", async function (req, res) {
    try {
      const { userName } = req.body;
      const response = await client.users.findUserByUsername(userName);
      res.send({ targetUser: response.data });
    } catch (error) {
      console.log(error);
    }
  });

  // 트위터 팔로우
  app.post("/tweets/follow", async function (req, res) {
    try {
      const { userId, targetId } = req.body;
      const follow = await client.users.usersIdFollow(userId, {
        target_user_id: targetId,
      });
      res.send({ follow: follow });
    } catch (error) {
      console.log(error);
    }
  });

  // 트위터 게시글 좋아요
  app.post("/tweets/like", async function (req, res) {
    try {
      const { userId, tweetId } = req.body;
      const like = await client.tweets.usersIdLike(userId, {
        tweet_id: tweetId,
      });
      res.send({ like: like });
    } catch (error) {
      console.log(error);
    }
  });

  // 트위터 리트윗
  app.post("/tweets/retweet", async function (req, res) {
    try {
      const { userId, tweetId } = req.body;
      const retweet = await client.tweets.usersIdRetweets(userId, {
        tweet_id: tweetId,
      });
      res.send({ retweet: retweet });
    } catch (error) {
      console.log(error);
    }
  });

  app.listen(3001, () => {});

  return { props: { msg: "hello world" } };
}
