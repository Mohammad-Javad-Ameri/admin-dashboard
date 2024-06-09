import { useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import UsersTable from "../../components/Tables/Users/UsersTable";
import "./Users.css";
import { useDashboard } from "../../context/AppContext";
import { allUsersApi, FilterUsers } from "../../Apis/UserApis";
import {
  AllUsersAction,
  FilterUsersAction,
  isLoadingAction,
} from "../../context/Actions/usersActions/UsersActions";
import { HandleAxiosError } from "../../utils/HandleAxiosErrors";
import Spinner from "../../components/spinner/Spinner";

export type usersProps = {};
const Users = () => {
  const { user, userDispatch, authDispatch }: any = useDashboard();
  useEffect(() => {
    console.log(user);
    if (!user.users.length) {
      (async () => {
        userDispatch(isLoadingAction(true));
        await allUsersApi()
          .then((res) => {
            userDispatch(AllUsersAction(res.data));
            console.log(res.data);
            userDispatch(isLoadingAction(false));
          })
          .catch((err) => {
            HandleAxiosError(err, authDispatch);
            userDispatch(isLoadingAction(false));
          });
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // handle search
  const SearchUser = async (values: {}) => {
    await FilterUsers(values)
      .then((res) => {
        userDispatch(FilterUsersAction(res.data));
      })
      .catch((err) => {
        HandleAxiosError(err, authDispatch);
        userDispatch(isLoadingAction(false));
      });
  };
  return (
    <section className="Users ">
      <Sidebar />
      <div className="w-full">
        <Navbar />
        <div className="content">
          <h2 className="PageTitle">Users</h2>
          <div className="Users_filter">
            <input
              type="text"
              placeholder="Search By Email"
              className="Field_input w-full"
              onChange={(e) => SearchUser({ email: e.target.value })}
            />
          </div>
          {user.isLoading ? (
            <Spinner />
          ) : (
            <UsersTable data={user ? user : []} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Users;
