import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { axiosAuthAPI } from "../../../lib/axios-config.ts";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const navigate = useNavigate();

  const signIn = async (formData: { email: string; password: string }) => {
    try {
      const res = await axiosAuthAPI.post(`/sign-in`, formData);
      const data: SignIn = res.data;
      const { token, user, noteID } = data;
      Cookies.set("accessToken", token.access);
      Cookies.set("refreshToken", token.refresh);
      localStorage.setItem("user", JSON.stringify(user));
      if (!data.noteID || window.innerWidth < 1280) {
        navigate("/app/home");
      } else {
        navigate(`/app/home/${noteID}`);
      }
      return data;
    } catch (err) {
      console.log(err);
      throw err;
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

  const signInMutation = useMutation({
    mutationFn: (data: { email: string; password: string }) => signIn(data),
  });

  return { signInMutation };
}
