import { Link } from "react-router-dom";
import SunIcon from "../assets/icon-sun.svg";
import FontIcon from "../assets/icon-font.svg";
import LockIcon from "../assets/icon-lock.svg";
import RightArrowIcon from "../assets/icon-chevron-right.svg";
export default function SettingsSidebar() {
  return (
    <aside className={"content-sidebar max-xl:hidden"}>
      <ul className={"flex flex-col justify-center gap-2 pl-8 pr-4"}>
        <Link
          to={"settings/theme"}
          className={"flex gap-2 items-center justify-between py-2 focus"}
        >
          <div className={"flex items-center gap-2"}>
            <img src={SunIcon} height={20} width={20} alt="sun" />
            <span>Color Theme</span>
          </div>
          <img src={RightArrowIcon} height={20} width={20} alt="right arrow" />
        </Link>
        <Link
          to={"settings/font"}
          className={"flex gap-2 items-center justify-between py-2 focus"}
        >
          <div className={"flex items-center gap-2"}>
            <img src={FontIcon} height={20} width={20} alt="sun" />
            <span>Font Theme</span>
          </div>
          <img src={RightArrowIcon} height={20} width={20} alt="right arrow" />
        </Link>
        <Link
          to={"settings/change-password"}
          className={"flex gap-2 items-center justify-between py-2 focus"}
        >
          <div className={"flex items-center gap-2"}>
            <img src={LockIcon} height={20} width={20} alt="sun" />
            <span>Change Password</span>
          </div>
          <img src={RightArrowIcon} height={20} width={20} alt="right arrow" />
        </Link>
      </ul>
    </aside>
  );
}
