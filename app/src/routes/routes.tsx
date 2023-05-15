import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/Landing";
import PetTaxi from "../pages/PetTaxi";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";

let unregisteredPages = {
  Landing: {
    path: "/",
    component: <LandingPage />,
  },
  PetTaxi: {
    path: "/pet-taxi",
    component: <PetTaxi />,
  },
  Login: {
    path: "/login",
    component: <LoginPage />,
  },
  Register: {
    path: "/register",
    component: <RegisterPage />,
  },
};

let ROUTES: any = {};

Object.assign(ROUTES, ROUTES, unregisteredPages);

export function getRoutes() {
  let result: any[] = [];

  for (const [key, value] of Object.entries(ROUTES)) {
    result.push(
      <Route
        key={"route-" + key}
        path={(value as any).path}
        element={(value as any).component}
      />
    );
  }

  return <Routes>{result}</Routes>;
}
