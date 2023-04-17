import { useContext } from "react";
import "./index.scss";
import AuthContext from "../../store/login/AuthContext";
const Header = () => {
  const context = useContext(AuthContext);
  return (
    <div className={"header"}>
      <div className={"header-main"}>
        <div className={"header-main__logo"}>
          <div className={"header-main__logo-logo"}></div>
          <div className={"header-main__logo-text"}>
            PetPlanner {context.token}
          </div>
        </div>
        <div className={"header-main__options"}>
          {/* {role === "REGISTERED" && getUserNavbar()}
          {role === "ADMIN" && getAdminNavbar()}
          {getLoggedButtons()} */}
        </div>
      </div>
    </div>
  );
};

export default Header;
