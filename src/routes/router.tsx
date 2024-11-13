import { createBrowserRouter } from "react-router-dom";
import AuthRouter from "./auth";
import DashboardRouter from "./dashboard";
import ErrorRouter from "./error";

const router = createBrowserRouter([AuthRouter, DashboardRouter, ErrorRouter]);

export default router;
