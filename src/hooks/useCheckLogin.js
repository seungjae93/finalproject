import { getCookie } from "../shared/cookie";
import { instance } from "../redux/api/instance";

export const checkLogin = () => {
  const accessToken = getCookie("token");
  const setToken = (accessToken) => {
    accessToken = instance.defaults.headers.common[
      "authorization"
    ] = `Bearer ${accessToken}`;
  };

  return { accessToken, setToken };
};
