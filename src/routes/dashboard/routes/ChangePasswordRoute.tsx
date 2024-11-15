import SettingPanel from "../../../features/settings/components/SettingPanel.tsx";
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
import { Button } from "../../../components/ui/button.tsx";
import ShowPasswordIcon from "../../../assets/icon-show-password.svg";
import HidePasswordIcon from "../../../assets/icon-hide-password.svg";
import { useRef } from "react";
import { useTogglePasswordVisibility } from "../../../hooks";

const formSchema = z.object({
  currentPassword: z
    .string()
    .min(8, { message: "Password must be more than 8 characters" }),
  newPassword: z
    .string()
    .min(8, { message: "Password must be more than 8 characters" }),
  confirmPassword: z
    .string()
    .min(8, { message: "Password must be more than 8 characters" }),
});

export default function ChangePasswordRoute() {
  const currentPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const [handleCurrentPasswordVis, showCurrentPassword] =
    useTogglePasswordVisibility(currentPasswordRef);
  const [handleNewPasswordVis, showNewPassword] =
    useTogglePasswordVisibility(newPasswordRef);
  const [handleConfirmPasswordVis, showConfirmPassword] =
    useTogglePasswordVisibility(confirmPasswordRef);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <SettingPanel title={"Change Password"}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full flex flex-col gap-4"
        >
          <FormField
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <div className={"relative"}>
                  <button
                    className={"absolute top-2/4 -translate-y-2/4 right-4"}
                    type={"button"}
                    onClick={handleCurrentPasswordVis}
                  >
                    <img
                      src={
                        showCurrentPassword
                          ? ShowPasswordIcon
                          : HidePasswordIcon
                      }
                      alt={
                        showCurrentPassword ? "show password" : "hide password"
                      }
                      height={20}
                      width={20}
                    />
                  </button>
                  <FormControl>
                    <Input
                      {...field}
                      ref={currentPasswordRef}
                      className={"pr-8"}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <div className={"relative"}>
                  <button
                    className={"absolute top-2/4 -translate-y-2/4 right-4"}
                    type={"button"}
                    onClick={handleNewPasswordVis}
                  >
                    <img
                      src={
                        showCurrentPassword
                          ? ShowPasswordIcon
                          : HidePasswordIcon
                      }
                      alt={showNewPassword ? "show password" : "hide password"}
                      height={20}
                      width={20}
                    />
                  </button>
                  <FormControl>
                    <Input {...field} ref={newPasswordRef} className={"pr-8"} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <div className={"relative"}>
                  <button
                    className={"absolute top-2/4 -translate-y-2/4 right-4"}
                    type={"button"}
                    onClick={handleConfirmPasswordVis}
                  >
                    <img
                      src={
                        showCurrentPassword
                          ? ShowPasswordIcon
                          : HidePasswordIcon
                      }
                      alt={
                        showConfirmPassword ? "show password" : "hide password"
                      }
                      height={20}
                      width={20}
                    />
                  </button>
                  <FormControl>
                    <Input
                      {...field}
                      ref={confirmPasswordRef}
                      className={"pr-8"}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <div className={"flex justify-end gap-2 mt-1"}>
            <Button type={"submit"} className={"w-fit"}>
              Save Password
            </Button>
          </div>
        </form>
      </Form>
    </SettingPanel>
  );
}
