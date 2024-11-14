import SearchInput from "../../../components/SearchInput.tsx";
import { useSearchParams } from "react-router-dom";
import SearchResults from "../../../components/SearchResults.tsx";

export default function SearchRoute() {
  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get("search");

  return (
    <div
      className={
        "overflow-hidden h-full flex flex-col gap-4 px-4 pt-5  md:px-8 md:py-6 xl:hidden"
      }
    >
      <h1 className={"text-preset-1 font-bold"}>Search</h1>

      <SearchInput />

      <p>
        {searchValue
          ? `All notes matching ”${searchValue}” are displayed below.`
          : null}
      </p>

      {searchValue !== "" ? <SearchResults /> : null}
    </div>
  );
}
