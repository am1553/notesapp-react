import { createBrowserRouter } from "react-router-dom";
import App from "../App.tsx";
import LoginRoute from "./login/LoginRoute.tsx";
import SignUpRoute from "./signup/SingUpRoute.tsx";
import DashboardRoute from "./dashboard/DashboardRoute.tsx";
import ProtectedRoutes from "./protected/ProtectedRoutes.tsx";
import NoteRoute from "./note/NoteRoute.tsx";

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
        path: "",
        Component: DashboardRoute,
        children: [
          {
            path: "",
            Component: NoteRoute,
          },
        ],
      },
    ],
  },
]);

export default router;
