import { ActionsProps } from "../../context/Actions/ActionProps.types";

import { userProps } from "../../context/InitialStates/AuthInitialState";
const Login = "LOGIN";
const Logout = "LOGOUT";
const OpenMenu = "OPEN_MENU";
const userReducer = (state: userProps, action: ActionsProps): any => {
  switch (action.type) {
    case Login:
      return {
        ...state,
        user: action.payload,
        isLogedin: true,
      };
    case Logout:
      localStorage.removeItem("AccessToken");
      return {
        ...state,
        user: null,
        isLogedin: false,
      };
    case OpenMenu:
      return {
        ...state,
        OpenMenu: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
