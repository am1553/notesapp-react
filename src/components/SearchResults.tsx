import NoteSummary from "../features/notes/components/NoteSummary.tsx";
import { useNotes } from "../service/useNotes.ts";
import { useSearchParams } from "react-router-dom";
import { useStyleContext } from "../context/StyleContext.tsx";

export default function SearchResults() {
  const { theme } = useStyleContext();
  const [searchParams] = useSearchParams();
  const { useNotesQuery } = useNotes();

  const { data, isLoading, isError } = useNotesQuery({
    searchValue: searchParams.get("search"),
  });

  if (isError) return <div>Error...</div>;
  if (isLoading) return <div>Loading...</div>;

  return data.length < 1 ? (
    <div className={" max-xl:pb-10 xl:pl-8 xl:pr-4 xl:pt-2 xl:pb-12"}>
      <p className="bg-neutral-100 rounded-md p-2">
        "No notes match your search. Try a different keyword or create a new
        note."
      </p>
    </div>
  ) : (
    <ul
      className={
        "h-full max-xl:pb-10 xl:pl-8 xl:pr-4 xl:pt-2 xl:pb-12 overflow-y-auto"
      }
    >
      {data.map((note: Note, i: number) => (
        <li key={note.id}>
          <NoteSummary note={note} rootPath={`app/search`} />
          {i < data.length - 1 ? (
            <hr
              className={`my-2 ${theme === "light" ? "border-neutral-200" : "border-neutral-800"}`}
            />
          ) : null}
        </li>
      ))}
    </ul>
  );
}
