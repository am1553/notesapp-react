import { Outlet, useNavigate } from "react-router-dom";
import { axiosAPI } from "../../lib/axios-config.ts";
import { useQuery } from "@tanstack/react-query";

export default function ProtectedRoutes() {
  const navigate = useNavigate();
  const validateToken = async (): Promise<boolean> => {
    console.log("VALIDATING TOKEN...", new Date());
    try {
      const res = await axiosAPI.get("/heartbeat");
      console.log(!!res.data.access);
      return !!res.data.access;
    } catch {
      navigate("/");
      return false;
    }
  };

  useQuery<boolean>({
    queryKey: ["heartbeat"],
    queryFn: validateToken,
    refetchInterval: 60 * 1000,
  });

  return (
    <div>
      <Outlet />
    </div>
  );
}
