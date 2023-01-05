import axios from "axios";

export const instance = axios.create({
  baseURL: "",
  headers: {},
});

//인터셉터를 써야 ==>악시오스 포스트를 했을때 서버에 보내기 전에 개발자가 원하는 작업을 할 수 잇다
