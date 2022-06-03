import { accessTokenSelector } from "./../../store/modules/auth";
import { useSelector } from "react-redux";
import { AxiosInstance, AxiosRequestConfig } from "axios";

function withAuth(axios: AxiosInstance) {
  const accessToken = useSelector(accessTokenSelector);

  const requestIntercept = axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      if (config.headers && !config.headers["Authorization"]) {
        // config.headers["Authorization"] = `Bearer ${accessToken}`;
        config.headers["ACCESS-TOKEN"] = `${accessToken}`;
        return config;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axios;
}

export default withAuth;
