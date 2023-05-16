import { useContext, useEffect } from "react";
import AuthContext from "../store/AuthContext";
import { useNavigate } from "react-router-dom";

type Props = {
  roles: String[];
};

export default function useRouteProtector(props: Props) {
  const contex = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!contex.isLoggedIn) navigate("/401");
    else if (contex.isLoggedIn && !props.roles.includes(contex.user.role))
      navigate("/403");
  }, [contex.isLoggedIn, contex.user.role]);
}
