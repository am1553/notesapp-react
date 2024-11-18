import SearchIcon from "../assets/icon-search.svg";
import { Input } from "./ui/input.tsx";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export default function SearchInput({ className }: { className?: string }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = () => {
    if (window.innerWidth >= 1280) {
      if (location.pathname.split("/").includes("search")) return;
      navigate("/app/search");
    }
  };

  const onBlur = () => {
    if (window.innerWidth >= 1280) {
      if (
        !searchParams.get("search") ||
        searchParams.get("search")!.trim() === ""
      ) {
        navigate(location.pathname);
      }
    }
  };

  return (
    <div className={"relative"}>
      <img
        src={SearchIcon}
        height={20}
        width={20}
        alt="search"
        className={"absolute top-2/4 -translate-y-2/4 left-4"}
      />
      <Input
        className={"rounded-md pl-12 w-full " + className}
        placeholder={"Search by title, content, or tags…"}
        onChange={(e) => setSearchParams({ search: e.target.value })}
        onFocus={handleNav}
        onClick={handleNav}
        onBlur={onBlur}
      />
    </div>
  );
}
