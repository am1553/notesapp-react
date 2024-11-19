import { z } from "zod";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form.tsx";
import { Input } from "../../../components/ui/input.tsx";
import ShowPasswordIcon from "../../../assets/icon-show-password.svg";
import HidePasswordIcon from "../../../assets/icon-hide-password.svg";
import { Button } from "../../../components/ui/button.tsx";
import { Link, useNavigate } from "react-router-dom";
import { useTogglePasswordVisibility } from "../../../hooks";
import { useAuth } from "../context/auth.tsx";
import { axiosAuthAPI } from "../../../lib/axios-config.ts";
import Cookies from "js-cookie";
const formSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: "Name should be greater than 3 characters." })
    .max(50, { message: "Name cannot be longer than 50 characters." }),
  lastName: z
    .string()
    .min(3, { message: "Last name should be greater than 3 characters." })
    .max(50, { message: "Last name cannot be longer than 50 characters." }),
  email: z.string().email({ message: "Email address is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be more than 8 characters" }),
});

export default function SignUpForm() {
  const [, , , setIsAuthenticating, setIsAuthenticated] = useAuth();
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });

  const [handlePasswordVis, showPassword] =
    useTogglePasswordVisibility(passwordInputRef);
  const handleSubmit = async (formData: z.infer<typeof formSchema>) => {
    setIsAuthenticating(true);
    try {
      const res = await axiosAuthAPI.post("/users", formData);
      const { token, user } = res.data;

      Cookies.set("accessToken", token.access);
      Cookies.set("refreshToken", token.refresh);

      localStorage.setItem("user", JSON.stringify(user));
      setIsAuthenticated(true);
      setIsAuthenticating(false);
      navigate("/app/home");
      console.log("Sign up successful: ", res);
    } catch (error) {
      console.log("Sign up failed: ", error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full flex flex-col gap-4 mt-6"
      >
        <FormField
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder={"John"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name={"firstName"}
        />
        <FormField
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder={"Doe"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name={"lastName"}
        />
        <FormField
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder={"example@email.com"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name={"email"}
        />
        <FormField
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <div className={"relative"}>
                <button
                  className={"absolute top-2/4 -translate-y-2/4 right-4"}
                  type={"button"}
                  onClick={handlePasswordVis}
                >
                  <img
                    src={showPassword ? ShowPasswordIcon : HidePasswordIcon}
                    alt=""
                    height={20}
                    width={20}
                  />
                </button>
                <FormControl>
                  <Input {...field} ref={passwordInputRef} className={"pr-8"} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
          name={"password"}
        />
        <Button type={"submit"}>Sign Up</Button>
      </form>
      <div>
        <span>Already have an account? </span>
        <Link to={"/"} className={"font-bold"}>
          Login
        </Link>
      </div>
    </Form>
  );
}
