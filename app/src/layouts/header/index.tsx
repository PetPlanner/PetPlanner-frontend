import "./index.scss";
const Header = () => {
  return (
    <div className={"header"}>
      <div className={"header-main"}>
        <div className={"header-main__logo"}>
          <div className={"header-main__logo-logo"}></div>
          <div className={"header-main__logo-text"}>PetPlanner</div>
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
