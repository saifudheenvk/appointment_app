import { IUserDetails } from "../../components/Dashboard";

export const SET_USER_DETAILS = "SET_USER_DETAILS";

export const setUserDetails = (data: IUserDetails | {}) => ({
  type: SET_USER_DETAILS,
  payload: data,
});
