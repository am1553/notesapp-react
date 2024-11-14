import Logo from "./Logo.tsx";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../constants/routes.ts";
import RightArrowIcon from "../assets/icon-chevron-right.svg";
export default function Sidebar({ className }: { className?: string }) {
  const location = useLocation();
  const pathname = location.pathname;
  const navRoutes = ROUTES.filter((route) => {
    const allowed = ["home", "archives"];
    if (allowed.includes(route.name)) {
      return route;
    }
  });

  const activeNav =
    pathname.split("/")[2] === "notes" ? "home" : pathname.split("/")[2];

  return (
    <aside
      className={"h-full py-3 px-4 flex flex-col gap-4 border-r " + className}
    >
      <Logo className={"py-3"} />
      <nav className={"flex flex-col gap-2"}>
        {navRoutes.map((route) => (
          <Link
            key={route.name}
            to={route.path}
            className={`flex items-center justify-between px-4 py-2.5 rounded-md focus ${activeNav === route.name ? "bg-neutral-100" : "bg-transparent"}`}
          >
            <div className={"flex items-center gap-2"}>
              <img
                src={route.icon}
                height={20}
                width={20}
                alt={route.name}
                className={`${activeNav === route.name ? "active-icon" : null}`}
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
            />
          </Link>
        ))}
      </nav>
      <hr className={"my-2"} />
      <ul></ul>
    </aside>
  );
}