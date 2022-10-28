import axios from "axios";
export const instance = axios.create({
  // baseURL: "http://localhost:3001",
});

instance.defaults.headers.post["Content-Type"] = "application/json";
