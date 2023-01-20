import { getCookie } from "../shared/cookie";

const useCheckLogin = () => {
  const accessToken = `Bearer ${getCookie("token")}`;
  const isLogin = Boolean(accessToken);

  return { accessToken, isLogin };
};

export default useCheckLogin;
