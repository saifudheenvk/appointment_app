import axios from "axios";
import { baseUrl } from "../constants";
export default axios.create({
  headers: {
    "Content-Type": "application/json",
    "auth-token": {
      toString() {
        return localStorage.getItem("userCredentials");
      },
    },
  },
  baseURL: baseUrl,
});