import { Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "../pages/Landing";
import PetTaxi from "../pages/PetTaxi";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import ErrorPage from "../pages/404";
import MyProfilePage from "../pages/MyProfile";
import WalkingPage from "../pages/PetWalking";
import PetPage from "../pages/PetPage";
import VetStationPage from "../pages/VetStation";
import PetHotel from "../pages/PetHotel";

let unregisteredPages = {
  Landing: {
    path: "/",
    component: <LandingPage />,
  },
  PetTaxi: {
    path: "/pet-taxi",
    component: <PetTaxi />,
  },
  PetWalking: {
    path: "/pet-walking",
    component: <WalkingPage />,
  },
  Login: {
    path: "/login",
    component: <LoginPage />,
  },
  Register: {
    path: "/register",
    component: <RegisterPage />,
  },
  MyProfile: {
    path: "/my-profile",
    component: <MyProfilePage />,
  },
  VetStation: {
    path: "/vet",
    component: <VetStationPage />,
  },
  PetHotel: {
    path: "/pet-hotel",
    component: <PetHotel />,
  },
  Pet: {
    path: "/pet/:id",
    component: <PetPage />,
  },
  Unauthorized: {
    path: "/401",
    component: <ErrorPage errorCode={"1"} />,
  },
  Forbidden: {
    path: "/403",
    component: <ErrorPage errorCode={"3"} />,
  },
  NotFound: {
    path: "/404",
    component: <ErrorPage errorCode={"4"} />,
  },
  Redirect: {
    path: "*",
    component: <Navigate to="/404" />,
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
