import RegisterForm from "../../components/Forms/RegisterForm";
import "./index.scss";

const RegisterPage = () => {
  return (
    <div className="register-page">
      <div className="register-page-container">
        <div className="register-page-container--img"></div>
        <div className="register-page-container--form">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
