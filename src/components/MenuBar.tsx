import { ROUTES } from "../constants/routes.ts";
import { Link, useLocation } from "react-router-dom";

export default function MenuBar({ className }: { className?: string }) {
  const location = useLocation();
  const pathname = location.pathname.split("/")[2];
  const activeNav = pathname === "notes" ? "home" : pathname;
  return (
    <nav
      className={
        "bg-white flex-center justify-around px-4 border-t " + className
      }
    >
      {ROUTES.map((route, i) => (
        <div className={"h-fit w-full flex gap-4"} key={route.name}>
          <Link
            to={route.path}
            className={`w-full h-fit flex-center rounded-md py-1 md:flex-col ${activeNav === route.name ? "bg-neutral-50" : "bg-transparent"}`}
          >
            <img
              src={route.icon}
              alt={route.name}
              height={24}
              width={24}
              className={`h-full ${activeNav === route.name ? "active-icon" : null}`}
            />
            <span className={"text-neutral-500 max-md:hidden"}>
              {route.label}
            </span>
          </Link>
          {i < ROUTES.length - 1 && <div className="w-[1px] bg-neutral-100" />}
        </div>
      ))}
    </nav>
  );
}
