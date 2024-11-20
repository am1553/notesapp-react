import SunIcon from "../../../assets/icon-sun.svg";
import FontIcon from "../../../assets/icon-font.svg";
import LockIcon from "../../../assets/icon-lock.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoutIcon from "../../../assets/icon-logout.svg";
import { useStyleContext } from "../../../context/StyleContext.tsx";
import RightArrowIcon from "../../../assets/icon-chevron-right.svg";
import { Button } from "../../../components/ui/button.tsx";
import Cookies from "js-cookie";
import { useAuth } from "../../../features/auth/context/auth.tsx";
const InnerRoutes: {
  to: string;
  label: string;
  icon: string;
}[] = [
  { to: "theme", label: "Color Theme", icon: SunIcon },
  { to: "font", label: "Font Theme", icon: FontIcon },
  { to: "change-password", label: "Change Password", icon: LockIcon },
];
export default function SettingsRoute() {
  const { theme } = useStyleContext();
  const [, , , , setIsAuthenticated] = useAuth();
  const navigate = useNavigate();
  const linkTheme = theme === "light" ? "bg-neutral-100" : "bg-neutral-800";
  const iconTheme = theme === "light" ? "" : "filter-white-icon";
  const handleLogout = () => {
    localStorage.removeItem("user");
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setIsAuthenticated(false);
    navigate("/");
  };
  return (
    <div
      className={`overflow-hidden h-full flex flex-col gap-4 px-4 pt-5  md:px-8 md:py-6 xl:hidden ${theme === "light" ? "bg-white" : "bg-neutral-950"}`}
    >
      <h1 className={"text-preset-1 font-bold"}>Settings</h1>

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
                  className={`${theme === "light" ? "" : "filter-white-icon"}`}
                />
                <span>{route.label}</span>
              </div>
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
        className={`flex gap-2 py-2 rounded-lg focus px-2 w-full justify-end`}
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
    </div>
  );
}
