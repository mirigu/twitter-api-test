import React from "react";
import { useRouter } from "next/router";
// redux
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { getToken } from "../../redux/modules/twitter/action";
import { statusReset } from "../../redux/modules/twitter/slice";

const Callback = () => {
  const dispatch = useAppDispatch();

  const router = useRouter();
  // 인가코드
  const code = router.query.code;

  const { success, error, errorMsg } = useAppSelector((state) => state.twitter);

  React.useEffect(() => {
    if (code !== undefined) {
      // 주소 쿼리에 코드가 있으면 인가코드 보내서 토큰 받아오는 함수 실행
      dispatch(getToken(code as string));
    }
    return;
  }, [code, dispatch]);

  // 성공하면
  React.useEffect(() => {
    if (success) {
      // 페이지 이동 시키고 리덕스 상태값 초기화
      router.push("/tweets");
      dispatch(statusReset());
    }
    return;
  }, [dispatch, router, success]);

  // 실패하면
  React.useEffect(() => {
    if (error) {
      // 에러메시지 표시해주고 리덕스 상태값 초기화
      alert(errorMsg);
      dispatch(statusReset());
    }
    return;
  }, [dispatch, error, errorMsg]);

  return <React.Fragment></React.Fragment>;
};

export default Callback;
