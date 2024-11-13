import { useAuth } from "../../features/auth";
import { Outlet, useNavigate } from "react-router-dom";

export default function ProtectedRoutes() {
  const { checkTokenQuery } = useAuth();
  const data = checkTokenQuery.data;
  console.log(data);
  const navigate = useNavigate();

  if (!data) navigate("/");
  return (
    <div>
      <Outlet />
    </div>
  );
}
