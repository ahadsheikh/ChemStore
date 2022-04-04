import axios from "axios";
export const cancelTokenSource = axios.CancelToken.source();
const instance = axios.create({
  baseURL: "https://chemstore.azurewebsites.net",
  cancelToken: cancelTokenSource.token,
});

export default instance;