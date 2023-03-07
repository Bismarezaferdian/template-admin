import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "http://localhost:3000/api/v1";

const token = Cookies.get("token") || null;
// console.log(token);

export const fetchData = axios.create({ baseURL: BASE_URL });

export const fetchUser = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  //untuk validate ketika create/update/delete send token untuk di comsume validate lewat headers
  headers: { accessToken: `Bearer ${token} ` },
});
