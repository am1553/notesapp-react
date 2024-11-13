import React from "react";

export default function MobileLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={"h-full " + className}>{children}</div>;
}
