import LoginRoute from "./LoginRoute.tsx";
import SignUpRoute from "./SingUpRoute.tsx";
import App from "../../App.tsx";

const AuthRouter = {
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
  ],
};

export default AuthRouter;
