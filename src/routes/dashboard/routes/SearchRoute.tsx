import SearchInput from "../../../components/SearchInput.tsx";
import { useSearchParams } from "react-router-dom";
import SearchResults from "../../../components/SearchResults.tsx";
import { useStyleContext } from "../../../context/StyleContext.tsx";

export default function SearchRoute() {
  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get("search");
  const { theme } = useStyleContext();
  return (
    <div
      className={`overflow-hidden h-full flex flex-col gap-4 px-4 pt-5  md:px-8 md:py-6 xl:hidden ${theme === "light" ? "bg-white" : "bg-neutral-950"}`}
    >
      <h1 className={"text-preset-1 font-bold"}>Search</h1>

      <SearchInput />

      <p>
        {searchValue
          ? `All notes matching ”${searchValue}” are displayed below.`
          : null}
      </p>

      <SearchResults />
    </div>
  );
}
