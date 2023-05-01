import { useContext } from "react";
import "./index.scss";
import AuthContext from "../../store/login/AuthContext";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const context = useContext(AuthContext);
  const isLoggedIn = context.isLoggedIn;
  const navigate = useNavigate();

  const getLoggedButtons = () => {
    return (
      <>
        <button className="logButtons" onClick={() => navigate("/login")}>
          Login
        </button>
        <button className="logButtons" onClick={() => navigate("/register")}>
          Sign up
        </button>
      </>
    );
  };
  return (
    <div className={"header"}>
      <div className={"header-main"}>
        <div
          className={"header-main__logo"}
          onClick={() => {
            navigate("/");
          }}
        >
          <div className={"header-main__logo-logo"}></div>
          <div className={"header-main__logo-text"}>PetPlanner</div>
        </div>
        <div className={"header-main__options"}>
          {/* {role === "REGISTERED" && getUserNavbar()}
          {role === "ADMIN" && getAdminNavbar()} */}
          {getLoggedButtons()}
        </div>
      </div>
    </div>
  );
};

export default Header;
