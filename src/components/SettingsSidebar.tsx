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
export default function SettingsSidebar() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [authenticate, isAuthenticating, isAuthenticated, setIsAuthenticated] =
    useAuth();
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

  const activeLink = useLocation().pathname.split("/")[3];

  const handleLogout = () => {
    localStorage.removeItem("user");
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <aside className={"content-sidebar max-xl:hidden pl-8 pr-4"} ref={ref}>
      <ul className={"flex flex-col justify-center gap-2"}>
        <Link
          to={"settings/theme"}
          className={`flex gap-2 items-center justify-between py-2 rounded-lg focus px-2 ${activeLink === "theme" && "bg-neutral-100"}`}
        >
          <div className={"flex items-center gap-2"}>
            <img src={SunIcon} height={20} width={20} alt="sun" />
            <span>Color Theme</span>
          </div>
          <img src={RightArrowIcon} height={20} width={20} alt="right arrow" />
        </Link>
        <Link
          to={"settings/font"}
          className={`flex gap-2 items-center justify-between py-2 rounded-lg focus px-2 ${activeLink === "font" && "bg-neutral-100"}`}
        >
          <div className={"flex items-center gap-2"}>
            <img src={FontIcon} height={20} width={20} alt="sun" />
            <span>Font Theme</span>
          </div>
          <img src={RightArrowIcon} height={20} width={20} alt="right arrow" />
        </Link>
        <Link
          to={"settings/change-password"}
          className={`flex gap-2 items-center justify-between py-2 rounded-lg focus px-2 ${activeLink === "change-password" && "bg-neutral-100"}`}
        >
          <div className={"flex items-center gap-2"}>
            <img src={LockIcon} height={20} width={20} alt="sun" />
            <span>Change Password</span>
          </div>
          <img src={RightArrowIcon} height={20} width={20} alt="right arrow" />
        </Link>
      </ul>
      <hr />
      <Button
        variant={"ghost"}
        type={"button"}
        className={`flex gap-2 py-2 rounded-lg focus px-2 w-full justify-start text-preset-3`}
        onClick={handleLogout}
      >
        <img src={LogoutIcon} height={20} width={20} alt="logout" />
        <span>Logout</span>
      </Button>
    </aside>
  );
}
