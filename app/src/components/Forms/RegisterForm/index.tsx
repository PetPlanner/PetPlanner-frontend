import { ErrorMessage, Field, Form, Formik } from "formik";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { WarningMessage } from "../../../utils/toastService/toastService";

const initValue = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  repeatPassword: "",
  country: "",
  city: "",
  street: "",
  title: "",
};
const validationRule = (values: any) => {
  const required = "This field is required.";
  const errors: any = {};
  if (!values.email) {
    errors.email = required;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = required;
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters long";
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*.?&])[A-Za-z\d@$.!%*?&]+$/i.test(
      values.password
    )
  ) {
    errors.password = "Minimum one uppercase,lowercase,digit,special char.";
  }
  if (!values.firstName) {
    errors.firstName = required;
  }
  if (!values.country) {
    errors.country = required;
  }
  if (!values.city) {
    errors.city = required;
  }
  if (!values.street) {
    errors.street = required;
  }
  if (!values.title) {
    errors.title = required;
  }
  if (!values.lastName) {
    errors.lastName = required;
  }
  if (!values.phoneNumber) {
    errors.phoneNumber = required;
  } else if (!/^\d+$/i.test(values.phoneNumber)) {
    errors.phoneNumber = "Phone number mustn't has letter.";
  }
  if (!values.repeatPassword) {
    errors.repeatPassword = required;
  } else if (values.password !== values.repeatPassword) {
    errors.repeatPassword = "Password confirmation does not match.";
  }
  return errors;
};

const RegisterForm = () => {
  const navigate = useNavigate();
  return (
    <div className="register-form">
      <div className="register-form--title">Registration</div>
      <Formik
        initialValues={initValue}
        validate={validationRule}
        onSubmit={async (values, { setSubmitting }) => {
          let res: any;
          console.log(values);
          //   if (!res || !res.data) {
          //     WarningMessage("Wrong credentials");
          //     return;
          //   }
          //   navigate("/");
          //   console.log(res.data.token);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="register-form__container">
            <div className="register-form__container__row">
              <div className="register-form__container__row__field-wrapper">
                {/* FIRSTNAME */}
                <Field
                  type="text"
                  name="firstName"
                  className="register-form__container__row__field-wrapper--field"
                  placeholder="First name"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="register-form__container__row__field-wrapper--error"
                />
              </div>
              <div className="register-form__container__row__field-wrapper">
                {/* LASTNAME */}
                <Field
                  type="text"
                  name="lastName"
                  className="register-form__container__row__field-wrapper--field"
                  placeholder="Last name"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="register-form__container__row__field-wrapper--error"
                />
              </div>
            </div>
            <div className="register-form__container__row">
              <div className="register-form__container__row__field-wrapper">
                {/* EMAIL */}
                <Field
                  type="email"
                  name="email"
                  className="register-form__container__row__field-wrapper--field"
                  placeholder="Email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="register-form__container__row__field-wrapper--error"
                />
              </div>
              <div className="register-form__container__row__field-wrapper">
                {/* PHONENUMBER */}
                <Field
                  type="text"
                  name="phoneNumber"
                  className="register-form__container__row__field-wrapper--field"
                  placeholder="Phone number"
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="register-form__container__row__field-wrapper--error"
                />
              </div>
            </div>
            <div className="register-form__container__row">
              <div className="register-form__container__row__field-wrapper">
                {/* PASSWORD */}
                <Field
                  type="password"
                  name="password"
                  className="register-form__container__row__field-wrapper--field"
                  placeholder="Password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="register-form__container__row__field-wrapper--error"
                />
              </div>
              <div className="register-form__container__row__field-wrapper">
                {/* REPEAT PASSWORD */}
                <Field
                  type="password"
                  name="repeatPassword"
                  className="register-form__container__row__field-wrapper--field"
                  placeholder="Repeat password"
                />
                <ErrorMessage
                  name="repeatPassword"
                  component="div"
                  className="register-form__container__row__field-wrapper--error"
                />
              </div>
            </div>

            <div className="register-form__container__row">
              <div className="register-form__container__row__field-wrapper">
                {/* Country */}
                <Field
                  type="text"
                  name="country"
                  className="register-form__container__row__field-wrapper--field"
                  placeholder="Country"
                />
                <ErrorMessage
                  name="country"
                  component="div"
                  className="register-form__container__row__field-wrapper--error"
                />
              </div>
              <div className="register-form__container__row__field-wrapper">
                {/* CITY */}
                <Field
                  type="text"
                  name="city"
                  className="register-form__container__row__field-wrapper--field"
                  placeholder="City"
                />
                <ErrorMessage
                  name="city"
                  component="div"
                  className="register-form__container__row__field-wrapper--error"
                />
              </div>
            </div>
            <div className="register-form__container__row">
              <div className="register-form__container__row__field-wrapper">
                {/* Street */}
                <Field
                  type="text"
                  name="street"
                  className="register-form__container__row__field-wrapper--field"
                  placeholder="Street"
                />
                <ErrorMessage
                  name="street"
                  component="div"
                  className="register-form__container__row__field-wrapper--error"
                />
              </div>
              <div className="register-form__container__row__field-wrapper">
                {/* TTILE */}
                <Field
                  type="text"
                  name="title"
                  className="register-form__container__row__field-wrapper--field"
                  placeholder="Title"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="register-form__container__row__field-wrapper--error"
                />
              </div>
            </div>
            <div className="register-form__container--button">
              <button
                type="submit"
                disabled={isSubmitting}
                className="button-40"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
