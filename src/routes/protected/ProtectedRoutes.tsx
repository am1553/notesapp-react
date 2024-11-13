import { useAuth } from "../../features/auth";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ProtectedRoutes() {
  const { checkTokenQuery } = useAuth();
  const data = checkTokenQuery;

  const navigate = useNavigate();

  useEffect(() => {
    if (!data.data && !data.isLoading) {
      navigate("/");
    }
  }, [data]);

  return (
    <div>
      <Outlet />
    </div>
  );
}
