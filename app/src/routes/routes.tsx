import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/Landing";
import LoginPage from "../pages/Login";

let unregisteredPages = {
  Landing: {
    path: "/",
    component: <LandingPage />,
  },
  Login: {
    path: "/login",
    component: <LoginPage />,
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
