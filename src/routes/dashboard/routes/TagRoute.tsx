import { NotesList } from "../../../features/notes";
import { useParams } from "react-router-dom";
import { useNotes } from "../../../service/useNotes.ts";
import { useStyleContext } from "../../../context/StyleContext.tsx";
export default function TagRoute() {
  const { tagName } = useParams();
  const { useNotesQuery } = useNotes();
  const { theme } = useStyleContext();
  const notes = useNotesQuery({ tagName });

  if (notes.isLoading) return <div>Loading...</div>;
  if (notes.isError) return <div>Error</div>;

  console.log(tagName);
  return (
    <div
      className={
        "px-4 py-5 md:px-8 md:py-6 flex flex-col gap-3 h-full xl:hidden"
      }
    >
      <div className={"flex flex-col gap-2"}>
        <h1 className={"text-neutral-600 text-preset-1 font-bold"}>
          Notes Tagged:{" "}
          <span
            className={`${theme === "light" ? "text-neutral-950" : "text-white"} capitalize`}
          >
            {tagName}
          </span>
        </h1>
        <p>
          All notes with the "<span className={"capitalize"}>{tagName}</span>"
          tag are shown here.
        </p>
      </div>

      <NotesList notesQuery={notes} rootPath={"app/home"} />
    </div>
  );
}
