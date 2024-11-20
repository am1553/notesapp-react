import React from "react";
import Sidebar from "../components/Sidebar.tsx";
import Header from "../components/Header.tsx";
import MenuBar from "../components/MenuBar.tsx";
import { useStyleContext } from "../context/StyleContext.tsx";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useStyleContext();
  return (
    <div
      className={`h-screen w-screen relative ${theme === "light" ? "max-xl:bg-neutral-100" : "max-xl:bg-neutral-800"} grid grid-rows-[54px_1fr] md:grid-rows-[74px_1fr] xl:grid-cols-[272px_1fr] xl:grid-rows-[80px_1fr]`}
    >
      <Sidebar className={"col-start-1 row-start-1 row-span-2 max-xl:hidden"} />
      <Header className={"xl:col-start-2 xl:row-start-1"} />
      <section
        className={`xl:col-start-2 row-start-2 h-full max-xl:shadow-[0px_0px_10px_2px_#00000010] max-xl:pb-20 max-xl:rounded-t-xl xl:border-t overflow-hidden ${theme === "light" ? "bg-white border-neutral-200" : "bg-neutral-950 border-neutral-800"} `}
      >
        {children}
      </section>
      <MenuBar className={"xl:hidden fixed bottom-0 right-0 left-0 h-16"} />
    </div>
  );
}
