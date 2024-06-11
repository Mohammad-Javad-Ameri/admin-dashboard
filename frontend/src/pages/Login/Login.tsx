import "./Login.css";
import LoginImg from "../../Assets/Img/login-office.jpeg";
import { Formik, Field, Form } from "formik";
import {
  initLogin,
  LoginSchema,
} from "../../components/Form/Validations/LoginSchema";
import Input from "../../components/Form/Input/Input";
import { LoginApi } from "../../Apis/AuthApis";
import { toast } from "react-toastify";
import { useDashboard } from "../../context/AppContext";
import { LoginUser } from "../../../src/context/Actions/AuthActions/AuthActions";
const Login = () => {
  const { authDispatch }: any = useDashboard();
  console.log(authDispatch);
  console.log(initLogin);
  console.log(LoginSchema);
  return (
    <section className="bg-gray-50 flex justify-center items-center h-screen w-screen">
      <div className="content">
        <div className="flex flex-wrap md:flex-nowrap md:h-[400px] max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl">
          <img
            src={LoginImg}
            alt="LoginImage"
            className="w-full md:w-1/2 object-cover h-[200px] md:h-auto"
          />
          <div className="w-full md:w-1/2 sm:p-10 p-2">
            <h2 className="text-2xl mb-10">Login</h2>
            <Formik
              initialValues={initLogin}
              validationSchema={LoginSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                await LoginApi(values.email, values.password)
                  .then((res) => {
                    if (res.data.isAdmin) {
                      localStorage.setItem("AccessToken", res.data.Token);
                      authDispatch(LoginUser(res.data));
                      window.location.href = "/";
                    } else {
                      toast("You Don`t Have Permitions !", { type: "error" });
                    }
                  })
                  .catch((err) =>
                    toast(err.response.data.message, { type: "error" })
                  );
              }}
            >
              {({ errors, touched, values, isSubmitting }) => (
                <Form className="flex flex-col items-start max-w-full gap-5 ">
                  <Field name="email">
                    {({ field, meta }: any) => (
                      <Input
                        type="email"
                        placeHolder="Email"
                        className="border p-3 md:w-[20vw] rounded-full"
                        field={field}
                        error={meta.touched && meta.error && meta.error}
                      />
                    )}
                  </Field>
                  <Field name="password">
                    {({ field, meta }: any) => (
                      <Input
                        type="password"
                        placeHolder="Password"
                        className="border p-3 md:w-[20vw] rounded-full"
                        field={field}
                        error={meta.touched && meta.error && meta.error}
                      />
                    )}
                  </Field>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className=" bg-primary text-white p-3 rounded-full mt-5 w-full m-0"
                  >
                    Login
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
