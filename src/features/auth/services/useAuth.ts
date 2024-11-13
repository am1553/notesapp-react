import { useMutation, useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { axiosAPI, axiosAuthAPI } from "../../../lib/axios-config.ts";

export default function useAuth() {
  const validateToken = async (): Promise<boolean> => {
    try {
      const res = await axiosAPI.get("/heartbeat");
      return !!res.data.access;
    } catch {
      return false;
    }
  };

  const signIn = async (formData: { email: string; password: string }) => {
    try {
      const res = await axiosAuthAPI.post(`/sign-in`, formData);
      const data: SignIn = res.data;
      const { token, user } = data;
      Cookies.set("accessToken", token.access);
      Cookies.set("refreshToken", token.refresh);
      localStorage.setItem("user", JSON.stringify(user));
    } catch (err) {
      console.log(err);
    }
  };

  // const signup = async (data: {
  //   email: string;
  //   password: string;
  //   firstName: string;
  //   lastName: string;
  // }) => {
  //   try {
  //     await axiosAuthAPI.post(`/users`, data).then((res) => {
  //       const data: SignIn = res.data;
  //       const { token, user } = data;
  //       Cookies.set("token", token.access);
  //       localStorage.setItem("refresh", token.refresh);
  //       localStorage.setItem("user", JSON.stringify(user));
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const checkTokenQuery = useQuery<boolean>({
    queryKey: ["heartbeat"],
    queryFn: validateToken,
  });

  const signInMutation = useMutation({
    mutationFn: (data: { email: string; password: string }) => signIn(data),
  });

  return { signInMutation, checkTokenQuery };
}
