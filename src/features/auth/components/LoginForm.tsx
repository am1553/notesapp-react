import { z } from "zod";
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
import { useRef, useState } from "react";
import { Button } from "../../../components/ui/button.tsx";
import { Link } from "react-router-dom";
import { useTogglePasswordVisibility } from "../../../hooks";
import useAuth from "../services/useAuth.ts";
import { ClipLoader } from "react-spinners";

const formSchema = z.object({
  email: z.string().email({ message: "Email address is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be more than 8 characters" }),
});

export default function LoginForm() {
  const { signInMutation } = useAuth();
  const { isPending, isError } = signInMutation;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [handlePasswordVis, showPassword] =
    useTogglePasswordVisibility(passwordInputRef);
  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    signInMutation
      .mutateAsync(data)
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
        if (err.status === 401) {
          throw new Error("Invalid credentials");
        }
        throw new Error(err);
      });
  };

  return isPending ? (
    <ClipLoader
      color={"#000"}
      loading={isLoading}
      size={50}
      aria-label="Loading Spinner"
      data-testid="loader"
      className={"mt-12"}
    />
  ) : (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full flex flex-col gap-4 mt-6"
      >
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
        <Button type={"submit"}>Login</Button>
      </form>
      <div>
        <span>No account yet? </span>
        <Link to={"/signup"} className={"font-bold"}>
          Sign Up
        </Link>
      </div>
      {isError && (
        <span className={"text-red-500"}>
          {isError &&
            "Login failed. Please check your credentials and try again."}
        </span>
      )}
    </Form>
  );
}
