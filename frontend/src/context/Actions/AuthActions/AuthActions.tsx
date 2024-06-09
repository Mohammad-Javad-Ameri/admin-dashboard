const Login = "LOGIN";
const Logout = "LOGOUT";
const OpenMenu = "OPEN_MENU";

export const LoginUser = (user: object) => {
  return {
    type: Login,
    payload: user,
  };
};

export const LogoutUser = () => {
  return {
    type: Logout,
  };
};

export const OpenMenuAction = (open: boolean) => {
  return {
    type: OpenMenu,
    payload: open,
  };
};
