import axios from "axios";

export const cancelTokenSource = axios.CancelToken.source();

const BASE_URL = "http://103.99.176.198"

const instance = axios.create({
  baseURL: BASE_URL,
  cancelToken: cancelTokenSource.token,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN_NAME);
    const auth = token ? `Bearer ${token}` : "";
    config.headers.common["Authorization"] = auth;
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
