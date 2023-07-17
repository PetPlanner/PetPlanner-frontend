import { useContext } from "react";
import NavButton from "../../components/Button";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../utils/store/AuthContext";
const Header = () => {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  let role = context.user.role;
  let isLoggedIn = context.isLoggedIn;
  const logoutHandler = () => {
    context.logout();
    navigate("/");
  };
  const getLogoutButton = () => {
    return (
      <>
        <NavButton text="Inbox" submitHandler={() => navigate("/inbox")} />
        <NavButton
          text="Profile"
          submitHandler={() => navigate("/my-profile")}
        />
        <NavButton text="Logout" submitHandler={logoutHandler} />
      </>
    );
  };

  const getLoginRegisterButtons = () => {
    return (
      <>
        <NavButton
          text={"Login"}
          submitHandler={() => navigate("/login")}
        ></NavButton>
        <NavButton
          text={"Sign up"}
          submitHandler={() => navigate("/register")}
        ></NavButton>
      </>
    );
  };

  const getProfileButton = () => {};
  const getLoggedButtons = () => {
    return <>{isLoggedIn ? getLogoutButton() : getLoginRegisterButtons()}</>;
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
