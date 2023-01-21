import { instance } from "../redux/api/instance";

const setToken = (accessToken) => {
  accessToken = instance.defaults.headers.common[
    "authorization"
  ] = `Bearer ${accessToken}`;
};

export default setToken;
