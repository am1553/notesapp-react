import { NotesList } from "../../../features/notes";
import { useNotes } from "../../../service/useNotes.ts";
import AddIcon from "../../../assets/icon-plus.svg";
import { Link } from "react-router-dom";
import { useStyleContext } from "../../../context/StyleContext.tsx";
export default function NotesRoute() {
  const { useNotesQuery } = useNotes();
  const { theme } = useStyleContext();
  const notes = useNotesQuery({ isArchived: false });
  return (
    <div
      className={`overflow-hidden h-full flex flex-col gap-4 px-4 pt-5  md:px-8 md:py-6 xl:hidden ${theme === "light" ? "bg-white text-neutral-950" : "bg-neutral-950 text-white"}`}
    >
      <h1 className={"text-preset-1 font-bold"}>All Notes</h1>
      <NotesList notesQuery={notes} rootPath={"app/home"} />
      <Link
        to={"/app/create-note"}
        className={
          "flex-center h-12 w-12 rounded-full bg-blue-500 absolute bottom-20 right-10 shadow-md"
        }
      >
        <img src={AddIcon} height={24} width={24} alt="add" />
      </Link>
    </div>
  );
}
