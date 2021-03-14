import { baseUrl } from "../../constants";
import axios from "../axios";

export default class ApiCalls {
  public static authenticateUser(payload: any) {
    return axios({
      url: `${baseUrl}/auth/login`,
      method: "POST",
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public static createNewUser(payload: any) {
    return axios({
      url: `${baseUrl}/users/create`,
      method: "POST",
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
