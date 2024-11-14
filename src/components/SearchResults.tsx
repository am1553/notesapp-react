import { useNotes } from "../features/notes";
import { useSearchParams } from "react-router-dom";
import NoteSummary from "../features/notes/components/NoteSummary.tsx";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get("search");
  const { notesQuery } = useNotes({ searchAll: true, value: searchValue });
  const { data, isError, isLoading } = notesQuery;
  if (!searchValue || searchValue.trim() === "") return null;
  if (isLoading) return null;
  if (isError) return null;
  if (!data) return null;
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
          {i < data.length - 1 ? <hr className={"my-2"} /> : null}
        </li>
      ))}
    </ul>
  );
}
