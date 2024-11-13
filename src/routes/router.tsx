import { createBrowserRouter } from "react-router-dom";
import App from "../App.tsx";
import LoginRoute from "./login/LoginRoute.tsx";
import SignUpRoute from "./signup/SingUpRoute.tsx";
import DashboardRoute from "./dashboard/DashboardRoute.tsx";
import ProtectedRoutes from "./protected";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/",
        Component: LoginRoute,
      },
      {
        path: "/signup",
        Component: SignUpRoute,
      },
    ],
  },
  {
    path: "/app",
    Component: ProtectedRoutes,
    children: [
      {
        path: "dashboard",
        Component: DashboardRoute,
      },
    ],
  },
]);

export default router;
