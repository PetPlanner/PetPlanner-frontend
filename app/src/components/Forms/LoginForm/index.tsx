import { ErrorMessage, Field, Form, Formik } from "formik";
import "./index.scss";
import { login } from "../../../services/authService";
import { useNavigate } from "react-router-dom";
import {
  SuccesMessage,
  WarningMessage,
} from "../../../utils/toastService/toastService";
import { useContext } from "react";
import AuthContext from "../../../utils/store/AuthContext";

const LoginForm = () => {
  const navigate = useNavigate();
  const context = useContext(AuthContext);

  return (
    <div className="login-form">
      <div className="login-form__title">
        <div className="login-form__title--hello">Hello,</div>
        <div className="login-form__title--welcome">welcome!</div>
      </div>
      <div className="login-form__contrainer">
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              (errors as any).email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              (errors as any).email = "Invalid email address";
            }
            if (!values.password) {
              (errors as any).password = "Required";
            } else if (values.password.length < 8) {
              (errors as any).password =
                "Password must be at least 8 characters long";
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            let res: any;
            console.log(values);
            res = await login(values);
            if (!res || !res.data) {
              WarningMessage("Wrong credentials");
              return;
            }
            context.login(res.data.token);
            SuccesMessage("Welcome back!");
            navigate("/");
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="login-form__contrainer__form">
              <div className="login-form__contrainer__form__field">
                <Field
                  type="email"
                  name="email"
                  className="login-form__contrainer__form--field"
                  placeholder="Email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="login-form__contrainer__form--error"
                />
              </div>
              <div className="login-form__contrainer__form__field">
                <Field
                  type="password"
                  name="password"
                  className="login-form__contrainer__form--field"
                  placeholder="Password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="login-form__contrainer__form--error"
                />
              </div>
              <div className="login-form__contrainer__form__button">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="button-42"
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
