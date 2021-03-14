import { SET_USER_DETAILS } from "../actions/users";

const userReducer = (state = {}, action: any) => {
  switch (action.type) {
    case SET_USER_DETAILS:
      return action.payload;
    default:
      return "";
  }
};
export default userReducer;
