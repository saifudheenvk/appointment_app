import { baseUrl } from "../../constants";
import axios from "../axios";

export default class UserApis {
  public static getSingleUser(id: string | null) {
    return axios({
      url: `${baseUrl}/users/${id}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
