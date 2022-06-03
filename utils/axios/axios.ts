import axios from "axios";

export enum AXIOS_KEY {
  axiosBasic = "axiosBasic",
  axiosLogin = "axiosLogin",
  axiosLogout = "axiosLogout",
  axiosWithAuth = "axiosWithAuth",
}

export default function createAxios(endpoint: string) {
  const axiosBasic = axios.create({
    baseURL: endpoint,
    headers: { "Content-Type": "application/json" },
  });

  const axiosLogin = axios.create({
    method: "post",
    baseURL: endpoint,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });

  const axiosLogout = axios.create({
    baseURL: endpoint,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });

  const axiosWithAuth = axios.create({
    baseURL: endpoint,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });

  const axiosRefresh = axios.create({
    baseURL: endpoint,
    withCredentials: true,
  });

  return {
    axiosBasic,
    axiosWithAuth,
    axiosLogin,
    axiosLogout,
  };
}
