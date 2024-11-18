import Logo from "./Logo.tsx";
import SettingsIcon from "../assets/icon-settings.svg";

import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import SearchInput from "./SearchInput.tsx";

export default function Header({ className }: { className?: string }) {
  const location = useLocation();
  const pathname = location.pathname;
  const currentRoute = pathname.split("/")[2];
  const { tagName } = useParams();
  const [searchParams] = useSearchParams();

  const title =
    currentRoute === "home" ? (
      "All Notes"
    ) : currentRoute === "archives" ? (
      "Archived Notes"
    ) : currentRoute === "tags" ? (
      <span>
        <span className={"text-neutral-600"}>Notes Tagged: </span>
        {tagName}
      </span>
    ) : currentRoute === "search" ? (
      `Showing results for: ${!searchParams.get("search") ? "" : searchParams.get("search")}`
    ) : currentRoute === "create-note" ? (
      "All Notes"
    ) : (
      "Settings"
    );
  return (
    <header
      className={
        "h-full flex items-center px-4 md:px-8 justify-between " + className
      }
    >
      <Logo className={"xl:hidden"} />
      <h1 className={"text-preset-1 font-bold max-xl:hidden capitalize"}>
        {title}
      </h1>

      <div className={"flex h-fit gap-4 max-xl:hidden"}>
        <SearchInput className={"w-80"} />
        <Link to={"/app/settings"} className={"flex items-center px-4 py-2"}>
          <img src={SettingsIcon} height={24} width={24} alt="settings" />
        </Link>
      </div>
    </header>
  );
}
