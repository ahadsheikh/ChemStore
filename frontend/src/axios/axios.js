import axios from "axios";

export const cancelTokenSource = axios.CancelToken.source();

const instance = axios.create({
  baseURL: "http://chemstore2.azurewebsites.net",
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
