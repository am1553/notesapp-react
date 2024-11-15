import { ReactNode } from "react";
import Logo from "../../../components/Logo.tsx";

export default function AuthForm({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div
      className={
        "bg-white rounded-lg px-4 py-10 md:px-8 md:py-12 lg:p-12 flex-center flex-col gap-4 w-full max-w-screen-sm"
      }
    >
      <Logo />
      <div className={"text-center flex flex-col gap-2 mt-2"}>
        <h1 className={"text-preset-1 font-bold"}>{title}</h1>
        <p>{description}</p>
      </div>
      {children}
    </div>
  );
}
