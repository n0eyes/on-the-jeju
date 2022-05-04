import axios from "axios";

const baseURL = "";

export default axios.create({
  baseURL,
});

export const axiosLogin = axios.create({
  baseURL,
  method: "post",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const axiosLogout = axios.create({
  baseURL,
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const axiosRefresh = axios.create({
  baseURL,
  withCredentials: true,
});
