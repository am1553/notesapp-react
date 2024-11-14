import Logo from "./Logo.tsx";
import { Input } from "./ui/input.tsx";
import SearchIcon from "../assets/icon-search.svg";
import SettingsIcon from "../assets/icon-settings.svg";
import { Button } from "./ui/button.tsx";

export default function Header({ className }: { className?: string }) {
  return (
    <header
      className={
        "h-full flex items-center px-4 md:px-8 justify-between " + className
      }
    >
      <Logo className={"xl:hidden"} />
      <h1 className={"text-preset-1 font-bold max-xl:hidden"}>All Notes</h1>

      <div className={"flex gap-2 max-xl:hidden"}>
        <div className={"relative"}>
          <img
            src={SearchIcon}
            height={20}
            width={20}
            alt="search"
            className={"absolute top-2/4 -translate-y-2/4 left-4"}
          />
          <Input
            className={"rounded-md pl-12 w-80"}
            placeholder={"Search by title, content, or tags…"}
          />
        </div>
        <Button variant={"ghost"} className={""}>
          <img src={SettingsIcon} height={24} width={24} alt="settings" />
        </Button>
      </div>
    </header>
  );
}
