import { ActionsProps } from "../../context/Actions/ActionProps.types";
import {
  DeleteUser,
  FilterUsers,
  getAllUsers,
  isLoading,
} from "../../context/Actions/usersActions/UsersActions.types";
import { userInitProps } from "../../context/InitialStates/UsersInitState";

export const UsersReducer = (state: userInitProps, action: ActionsProps) => {
  switch (action.type) {
    case isLoading:
      return {
        ...state,
        isLoading: action.payload,
      };
    case getAllUsers:
    case FilterUsers:
      return {
        ...state,
        users: action.payload.data,
        TotalPages: action.payload.TotalPages,
        TotalRecords: action.payload.TotalRecords,
        currentPage: action.payload.currentPage,
        isLoading: false,
      };
    case DeleteUser:
      return {
        ...state,
        users: state.users?.filter((user) => user._id !== action.payload),
        TotalRecords: state.TotalRecords - 1,
        isLoading: false,
      };
    default:
      return state;
  }
};
