import React from "react";
import { useStyleContext } from "../context/StyleContext.tsx";

export default function MobileLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { theme } = useStyleContext();
  return (
    <div
      className={
        `h-full ${theme === "light" ? "bg-neutral-200" : "bg-neutral-950"} ` +
        className
      }
    >
      {children}
    </div>
  );
}
