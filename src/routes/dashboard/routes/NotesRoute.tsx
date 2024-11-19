import { NotesList } from "../../../features/notes";
import { useNotes } from "../../../service/useNotes.ts";
import AddIcon from "../../../assets/icon-plus.svg";
import { Link } from "react-router-dom";
export default function NotesRoute() {
  const { useNotesQuery } = useNotes();
  const notes = useNotesQuery({ isArchived: false });
  return (
    <div
      className={
        "overflow-hidden h-full flex flex-col gap-4 px-4 pt-5  md:px-8 md:py-6 xl:hidden"
      }
    >
      <h1 className={"text-preset-1 font-bold"}>All Notes</h1>
      <NotesList notesQuery={notes} rootPath={"app/home"} />
      <Link
        to={"/app/create-note"}
        className={
          "flex-center h-10 w-10 rounded-full bg-blue-500 absolute bottom-16 right-4"
        }
      >
        <img src={AddIcon} height={24} width={24} alt="add" />
      </Link>
    </div>
  );
}
