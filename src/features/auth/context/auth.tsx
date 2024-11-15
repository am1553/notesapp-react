import React, { createContext, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { axiosAuthAPI } from "../../../lib/axios-config.ts";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";

type SQ = UseMutationResult<
  AxiosResponse<unknown, unknown>,
  Error,
  { email: string; password: string },
  unknown
>;
type AuthType = [
  SQ,
  boolean,
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
  React.Dispatch<React.SetStateAction<boolean>>,
];

const defaultAuthProvider: AuthType = [
  {} as SQ,
  false,
  false,
  () => {},
  () => {},
];

const AuthContext = createContext<AuthType>(defaultAuthProvider);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(
    !!Cookies.get("accessToken"),
  );
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
    onError: () => {
      setIsAuthenticated(false);
      setIsAuthenticating(false);
    },
  });

  useEffect(() => {
    if (!isAuthenticated) {
      setIsAuthenticating(false);
      navigate("/");
    }
  }, [isAuthenticated]);

  const value: AuthType = [
    signInMutation, // Index 0: Provide the signInMutation result here
    isAuthenticating, // Index 1: Pass the isAuthenticating state
    isAuthenticated, // Index 2: Pass the isAuthenticated state
    setIsAuthenticating, // Index 3: Pass the setIsAuthenticating function
    setIsAuthenticated, // Index 4: Pass the setIsAuthenticated function
  ];

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
