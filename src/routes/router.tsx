import { createBrowserRouter } from "react-router-dom";
import DashboardRouter from "./dashboard";
import ErrorRouter from "./error";
import App from "../App.tsx";
import LoginRoute from "./auth/LoginRoute.tsx";
import SignUpRoute from "./auth/SingUpRoute.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: LoginRoute,
      },
      {
        path: "signup",
        Component: SignUpRoute,
      },
      DashboardRouter,
      ErrorRouter,
    ],
  },
]);

export default router;
