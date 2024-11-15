import { Navigate, Outlet } from "react-router-dom";
import { Suspense } from "react";
import Loading from "../Loading.tsx";
import { useAuth } from "../../features/auth/context/auth.tsx";

export default function ProtectedRoutes() {
  const [, isAuthenticating, isAuthenticated] = useAuth();

  console.log(
    "isAuthenticated: ",
    isAuthenticated,
    "isAuthenticating: ",
    isAuthenticated,
  );

  if (isAuthenticating) return <Loading />;
  if (!isAuthenticated) return <Navigate to="/" replace={true} />;
  return (
    <Suspense
      fallback={
        <div className={"text-[720px] font-bold"}>
          THIS IS PROTECTED SUSPENSE
        </div>
      }
    >
      <div>
        <Outlet />
      </div>
    </Suspense>
  );
}
