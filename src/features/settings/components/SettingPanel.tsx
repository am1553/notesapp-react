import LeftArrowIcon from "../../../assets/icon-arrow-left.svg";
import { Button } from "../../../components/ui/button.tsx";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function SettingPanel({
  children,
  title,
  description,
  onClick,
}: {
  children: React.ReactNode;
  title: string;
  description?: string;
  onClick?: () => void;
}) {
  const navigate = useNavigate();
  return (
    <div
      className={
        "px-4 py-5 md:px-8 md:py-6 xl:p-0 flex flex-col gap-3 h-full max-w-screen-sm"
      }
    >
      <button
        onClick={() => navigate(-1)}
        className={"flex items-center gap-2 xl:hidden"}
      >
        <img src={LeftArrowIcon} height={18} width={18} alt="left arrow" />
        <span>Go Back</span>
      </button>
      <div className={"flex flex-col gap-2"}>
        <h1 className={"text-preset-1 font-bold"}>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {children}
      {onClick ? (
        <div className={"flex justify-end gap-2 mt-1"}>
          <Button className={"w-fit"}>Apply Changes</Button>
        </div>
      ) : null}
    </div>
  );
}
