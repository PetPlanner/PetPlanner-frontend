import { ErrorMessage, Field, Form, Formik } from "formik";
import "./index.scss";
import { login } from "../../../services/authService";
import { useContext } from "react";
import AuthContext from "../../../store/login/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const contex = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="login_wrapper">
      <div className="login">
        <div className="loginForm">
          <div className="loginForm__title">Sign In to Your Account</div>
          <div className="loginForm__fields">
            <Formik
              initialValues={{ email: "", password: "" }}
              // validate={(values) => {
              //   const errors = {};
              //   if (!values.email) {
              //     errors.email = "Required";
              //   } else if (
              //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              //   ) {
              //     errors.email = "Invalid email address";
              //   }
              //   if (!values.password) {
              //     errors.password = "Required";
              //   } else if (values.password.length < 8) {
              //     errors.password =
              //       "Password must be at least 8 characters long";
              //   }
              //   return errors;
              // }}
              onSubmit={async (values, { setSubmitting }) => {
                let res: any;
                res = await login(values);
                console.log(res);
                // if (!res || !res.ok) {
                //   alert("Wrong credentials");
                //   return;
                // }
                contex.login(res.data.token);
                navigate("/");
                console.log(res.data.token);
                setSubmitting(false);
              }}
            >
              {({ isSubmitting }) => (
                <Form className="login__form">
                  <Field
                    type="email"
                    name="email"
                    className="login__field"
                    placeholder="Email"
                  />
                  <ErrorMessage name="email" component="div" />
                  <Field
                    type="password"
                    name="password"
                    className="login__field"
                    placeholder="Password"
                  />
                  <ErrorMessage name="password" component="div" />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="login__button"
                  >
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          </div>
          <div className="loginForm__button"></div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
