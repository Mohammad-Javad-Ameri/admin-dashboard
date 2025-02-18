import { ReactNode, Dispatch, useContext, useEffect } from "react";
import { createContext, useReducer } from "react";
import { ActionsProps } from "../context/Actions/ActionProps.types";
import AuthinitState from "../context/InitialStates/AuthInitialState";
import UserReducer from "../context/Reducers/AuthReducer";
import { useNavigate } from "react-router-dom";
import { CategoryReducer } from "../context/Reducers/CategoryReducer";
import { CategoriesInitialState } from "../context/InitialStates/CategoriesInitialState";
import { ProductReducer } from "../context/Reducers/ProductReducer";
import { ProductsInitState } from "../context/InitialStates/ProductsInitState";
import { UsersReducer } from "../context/Reducers/UsersReducer";
import UsersInitState from "../context/InitialStates/UsersInitState";
import { OrderReducer } from "../context/Reducers/OrderReducer";
import { OrdersInitialState } from "../context/InitialStates/OrdersInitState";
type ProviderProps = {
  children: ReactNode;
};
export type contextProps = {
  auth: any;
  authDispatch: Dispatch<ActionsProps>;
  category: any;
  categoryDispatch: Dispatch<ActionsProps>;
  product: any;
  productDispatch: Dispatch<ActionsProps>;
  user: any;
  userDispatch: Dispatch<ActionsProps>;
  order: any;
  orderDispatch: Dispatch<ActionsProps>;
};
export const AppContext = createContext<contextProps | null>(null);
export const AppProvider = ({ children }: ProviderProps) => {
  const navigate = useNavigate();
  const [auth, authDispatch] = useReducer(UserReducer, AuthinitState);
  const [category, categoryDispatch] = useReducer(
    CategoryReducer,
    CategoriesInitialState
  );
  const [product, productDispatch] = useReducer(
    ProductReducer,
    ProductsInitState
  );
  const [user, userDispatch] = useReducer(UsersReducer, UsersInitState);
  const [order, orderDispatch] = useReducer(OrderReducer, OrdersInitialState);
  useEffect(() => {
    if (!localStorage.getItem("AccessToken")) return navigate("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.getItem("AccessToken")]);
  return (
    <AppContext.Provider
      value={{
        auth,
        authDispatch,
        category,
        categoryDispatch,
        product,
        productDispatch,
        user,
        userDispatch,
        order,
        orderDispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useDashboard = () => {
  return useContext(AppContext);
};
