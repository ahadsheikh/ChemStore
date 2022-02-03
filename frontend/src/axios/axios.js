import axios from "axios";

const instance = axios.create({
  baseURL: "http://chemstore.azurewebsites.net",
});

export default instance;