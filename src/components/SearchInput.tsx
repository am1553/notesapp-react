import SearchIcon from "../assets/icon-search.svg";
import { Input } from "./ui/input.tsx";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function SearchInput({ className }: { className?: string }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleClick = () => {
    if (window.innerWidth >= 1280) {
      navigate("/app/search");
    }
  };

  return (
    <div className={"relative"} onClick={handleClick}>
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
      />
    </div>
  );
}
