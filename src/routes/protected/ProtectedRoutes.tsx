import { Navigate, Outlet } from "react-router-dom";
import { Suspense } from "react";
import Loading from "../Loading.tsx";
import { useAuth } from "../../features/auth/context/auth.tsx";

export default function ProtectedRoutes() {
  const [authenticate, isAuthenticating, isAuthenticated] = useAuth();
  console.log(
    "isAuthenticated: ",
    isAuthenticated,
    "isAuthenticating: ",
    isAuthenticated,
  );
  if (isAuthenticating) return <Loading />;
  if (!isAuthenticated) return <Navigate to="/" replace={true} />;
  return (
    <Suspense fallback={<Loading />}>
      <div>
        <Outlet />
      </div>
    </Suspense>
  );
}
