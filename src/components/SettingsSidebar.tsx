import { Link, useLocation, useNavigate } from "react-router-dom";
import SunIcon from "../assets/icon-sun.svg";
import FontIcon from "../assets/icon-font.svg";
import LockIcon from "../assets/icon-lock.svg";
import RightArrowIcon from "../assets/icon-chevron-right.svg";
import LogoutIcon from "../assets/icon-logout.svg";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { Button } from "./ui/button.tsx";
import { useAuth } from "../features/auth/context/auth.tsx";
import { useStyleContext } from "../context/StyleContext.tsx";

const InnerRoutes: {
  to: string;
  label: string;
  icon: string;
}[] = [
  { to: "settings/theme", label: "Color Theme", icon: SunIcon },
  { to: "settings/font", label: "Font Theme", icon: FontIcon },
  { to: "settings/change-password", label: "Change Password", icon: LockIcon },
];

export default function SettingsSidebar() {
  const { theme } = useStyleContext();
  const [, , , , setIsAuthenticated] = useAuth();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (inView) {
      navigate(`/app/settings/theme`);
    }
  }, [inView, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setIsAuthenticated(false);
    navigate("/");
  };

  const linkTheme = theme === "light" ? "bg-neutral-100" : "bg-neutral-800";
  const iconTheme = theme === "light" ? "" : "filter-white-icon";
  return (
    <aside className={"content-sidebar max-xl:hidden pl-8 pr-4"} ref={ref}>
      <ul className={"flex flex-col justify-center gap-2"}>
        {InnerRoutes.map((route) => {
          const isActive =
            useLocation().pathname.split("/")[3] === route.to.split("/")[1];

          return (
            <Link
              key={route.to}
              to={route.to}
              className={`flex gap-2 items-center justify-between py-2 rounded-lg focus px-2 ${isActive && linkTheme}`}
            >
              <div className={"flex items-center gap-2"}>
                <img
                  src={route.icon}
                  height={20}
                  width={20}
                  alt="sun"
                  className={`${isActive ? "active-icon" : iconTheme}`}
                />
                <span>{route.label}</span>
              </div>
              {isActive && (
                <img
                  src={RightArrowIcon}
                  height={20}
                  width={20}
                  alt="right arrow"
                  className={`${theme === "light" ? "" : "filter-white-icon"}`}
                />
              )}
            </Link>
          );
        })}
      </ul>
      <hr
        className={`my-2 ${theme === "light" ? "border-neutral-200" : "border-neutral-800"}`}
      />
      <Button
        variant={"ghost"}
        type={"button"}
        className={`flex gap-2 py-2 rounded-lg focus px-2 w-full justify-start`}
        onClick={handleLogout}
      >
        <img
          src={LogoutIcon}
          height={20}
          width={20}
          alt="sun"
          className={`${theme === "light" ? "" : "filter-white-icon"}`}
        />
        <span>Logout</span>
      </Button>
    </aside>
  );
}
