import SunIcon from "../../../assets/icon-sun.svg";
import FontIcon from "../../../assets/icon-font.svg";
import LockIcon from "../../../assets/icon-lock.svg";
import { Link } from "react-router-dom";
import LogoutIcon from "../../../assets/icon-logout.svg";
export default function SettingsRoute() {
  return (
    <div
      className={
        "overflow-hidden h-full flex flex-col gap-4 px-4 pt-5  md:px-8 md:py-6 xl:hidden"
      }
    >
      <h1 className={"text-preset-1 font-bold"}>Settings</h1>

      <ul className={"flex flex-col justify-center gap-2"}>
        <Link to={"theme"} className={"flex gap-2 items-center py-2"}>
          <img src={SunIcon} height={20} width={20} alt="sun" />
          <span>Color Theme</span>
        </Link>
        <Link to={"font"} className={"flex gap-2 items-center py-2"}>
          <img src={FontIcon} height={20} width={20} alt="sun" />
          <span>Font Theme</span>
        </Link>
        <Link to={"change-password"} className={"flex gap-2 items-center py-2"}>
          <img src={LockIcon} height={20} width={20} alt="sun" />
          <span>Change Password</span>
        </Link>
      </ul>
      <hr />

      <Link to={"/"} className={"flex gap-2 items-center py-2"}>
        <img src={LogoutIcon} height={20} width={20} alt="sun" />
        <span>Logout</span>
      </Link>
    </div>
  );
}
