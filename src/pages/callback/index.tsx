import React from "react";
import { useRouter } from "next/router";
// axios
import { instance } from "../../api";
// cookie
import { getCookie, setCookie } from "../../utils/cookie";

const Callback = () => {
  const router = useRouter();
  const code = router.query.code;

  // 인가코드 보내고 토큰 받아서 쿠키에 저장하는 함수
  const saveToken = React.useCallback(async () => {
    const response = await instance.post("/token", { code });
    setCookie("token", response.data.token.access_token);
    setCookie("refresh_token", response.data.token.refresh_token);
    await router.push("/tweets")
  }, [code, router]);

  React.useEffect(() => {
    if (code !== undefined) {
      // 주소 쿼리에 코드가 있으면
      saveToken();
    }
    return;
  }, [code, saveToken]);

  React.useEffect(() => {
    if (getCookie("token") !== undefined) {
      // 쿠키에 토큰이 있으면
      router.push("/tweets");
    }
    return;
  }, [router]);

  return <React.Fragment></React.Fragment>;
};

export default Callback;
