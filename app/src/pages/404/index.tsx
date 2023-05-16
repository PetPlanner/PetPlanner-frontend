import "./index.scss";

type Props = {
  errorCode: String;
};
const ErrorPage = (props: Props) => {
  const getErrorMessage = (code: String) => {
    let message: String = "";
    if (code == "1") message = "Unauthorized Access";
    else if (code == "3") message = "Forbidden Access";
    else if (code == "4") message = "Oops! Page Not Found";
    return message;
  };
  return (
    <div className="error-page">
      <div className="error-page__code">
        <div className="error-page__code--number">4</div>
        <div className="error-page__code--zero"></div>
        <div className="error-page__code--number">{props.errorCode}</div>
      </div>
      <div className="error-page__desc">{getErrorMessage(props.errorCode)}</div>
    </div>
  );
};

export default ErrorPage;
