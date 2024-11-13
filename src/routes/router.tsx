import {createBrowserRouter} from "react-router-dom";
import App from "../App.tsx";
import LoginRoute from "./login/LoginRoute.tsx";
import SignUpRoute from "./signup/SingUpRoute.tsx";

const router = createBrowserRouter(
    [
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
                }
            ]
        }
    ]
)

export default router;