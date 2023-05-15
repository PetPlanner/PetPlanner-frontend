import LoginForm from "../../components/Forms/LoginForm";
import "./index.scss";
const LoginPage = () => {
  return (
    <div className="login-page">
      <div className="login-page-container">
        <div className="login-page-container--form">
          <LoginForm></LoginForm>
        </div>
        <div className="login-page-container--img"></div>
      </div>
    </div>
  );
};

export default LoginPage;
