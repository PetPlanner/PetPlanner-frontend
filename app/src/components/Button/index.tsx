import { MouseEventHandler } from "react";
import "./index.scss";

type Props = {
  submitHandler: MouseEventHandler;
  text: String;
};

const NavButton = (props: Props) => {
  return (
    <button
      className="button-82-pushable"
      role="button"
      onClick={props.submitHandler}
    >
      <span className="button-82-shadow"></span>
      <span className="button-82-edge"></span>
      <span className="button-82-front text">{props.text}</span>
    </button>
  );
};

export default NavButton;
