import "./index.scss";

function Footer() {
  // const navigate = useNavigate();

  const loginHandler = () => {
    // navigate("/authenticate");
  };

  return (
    <div className="footer">
      <div className="footer__row">
        <div className="footer__row__elem">
          <div className="wrap">
            <div className="wrap__icon"></div>
            <div className="wrap__text">Serbia (SRB) - дин</div>
          </div>
          <div className="footer__row__item">
            <p>Help</p>
            <p>Privacy settings</p>
            <p onClick={loginHandler}>Log in</p>
          </div>
        </div>
        <div className="footer__row__item">
          <p>Cookie policy</p>
          <p>Privacy policy</p>
          <p>Terms of service</p>
          <p>Company Details</p>
        </div>
      </div>
      <div className="footer__policy">
        <div>Compare and book cheap flights from anywhere, to everywhere</div>
        <div>© Airdealer Ltd 2002 – 2023</div>
      </div>
    </div>
  );
}

export default Footer;
