import React, {
  createContext,
  SetStateAction,
  useContext,
  useEffect,
} from "react";
import Cookies from "js-cookie";
import { axiosAuthAPI } from "../../../lib/axios-config.ts";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";

const defaultSignInQuery: UseMutationResult<
  AxiosResponse<unknown, unknown>,
  Error,
  { email: string; password: string },
  unknown
> = {
  data: undefined,
  error: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  mutate: () => {},
  // @ts-expect-error
  mutateAsync: async () => undefined,
  reset: () => {},
  status: "idle",
  context: undefined,
};

type AuthProvider = [
  UseMutationResult<
    AxiosResponse<any, any>,
    Error,
    { email: string; password: string },
    unknown
  >,
  boolean,
  boolean,
  React.Dispatch<SetStateAction<boolean>>,
];
const defaultAuthProvider: AuthProvider = [
  defaultSignInQuery,
  false,
  false,
  () => {},
];
const AuthContext = createContext(defaultAuthProvider);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isAuthenticating, setIsAuthenticating] = React.useState(false);
  const navigate = useNavigate();

  const signInMutation = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      setIsAuthenticating(true);
      try {
        return await axiosAuthAPI.post(`/sign-in`, data);
      } catch (err) {
        setIsAuthenticated(false);
        console.log(err);
        throw err;
      }
    },
    onSuccess: (res) => {
      const data: SignIn = res.data;
      const { token, user } = data;
      Cookies.set("accessToken", token.access);
      Cookies.set("refreshToken", token.refresh);
      localStorage.setItem("user", JSON.stringify(user));
      setIsAuthenticating(false);
      setIsAuthenticated(true);
      if (!data.noteID || window.innerWidth < 1280) {
        navigate("/app/home");
      } else {
        navigate(`/app/home/${data.noteID}`);
      }
      return res;
    },
  });

  useEffect(() => {
    if (!isAuthenticated) {
      setIsAuthenticating(false);
    }
  }, [isAuthenticated]);

  const value: AuthProvider = [
    signInMutation,
    isAuthenticating,
    isAuthenticated,
    setIsAuthenticated,
  ];

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
