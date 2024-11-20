import Logo from "./Logo.tsx";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../constants/routes.ts";
import RightArrowIcon from "../assets/icon-chevron-right.svg";
import SidebarTagsNav from "./SidebarTagsNav.tsx";
import { useStyleContext } from "../context/StyleContext.tsx";

export default function Sidebar({ className }: { className?: string }) {
  const location = useLocation();
  const { theme } = useStyleContext();
  const pathname = location.pathname;
  const navRoutes = ROUTES.filter((route) => {
    const allowed = ["home", "archives"];
    return allowed.includes(route.name);
  });

  const activeNav =
    pathname.split("/")[2] === "notes" ? "home" : pathname.split("/")[2];

  return (
    <aside
      className={
        `h-full py-3 px-4 flex flex-col gap-4 border-r ${theme === "light" ? "border-neutral-200" : "border-neutral-800"} ` +
        className
      }
    >
      <Logo className={"py-3"} />
      <nav className={"flex flex-col gap-2"}>
        {navRoutes.map((route) => {
          const isActive = activeNav === route.name;

          return isActive ? (
            <div
              key={route.name}
              className={`flex items-center justify-between px-4 py-2.5 rounded-md ${theme === "light" ? "bg-neutral-100" : "bg-neutral-800"} pointer-events-none`}
            >
              <div className={"flex items-center gap-2"}>
                <img
                  src={route.icon}
                  height={20}
                  width={20}
                  alt={route.name}
                  className={"active-icon"}
                />
                <span>
                  {route.name === "home" ? "All Notes" : "Archived Notes"}
                </span>
              </div>
              <img
                src={RightArrowIcon}
                height={20}
                width={20}
                alt={"right arrow"}
                className={`${theme === "light" ? "" : "filter-white-icon"}`}
              />
            </div>
          ) : (
            <Link
              key={route.name}
              to={route.path}
              className={`flex items-center justify-between px-4 py-2.5 rounded-md focus bg-transparent`}
            >
              <div className={"flex items-center gap-2"}>
                <img
                  src={route.icon}
                  height={20}
                  width={20}
                  alt={route.name}
                  className={`${theme === "light" ? "" : "filter-white-icon"}`}
                />
                <span>
                  {route.name === "home" ? "All Notes" : "Archived Notes"}
                </span>
              </div>
              {isActive && (
                <img
                  src={RightArrowIcon}
                  height={20}
                  width={20}
                  alt={"right arrow"}
                />
              )}
            </Link>
          );
        })}
      </nav>
      <hr
        className={`my-2 ${theme === "light" ? "border-neutral-200" : "border-neutral-800"}`}
      />
      <SidebarTagsNav />
    </aside>
  );
}
