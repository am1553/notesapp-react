import { NotesList } from "../../../features/notes";
import {useNotes} from "../../../service/useNotes.ts";

export default function NotesRoute() {
  const { useNotesQuery } = useNotes();
  const notes = useNotesQuery();
  return (
    <div
      className={
        "overflow-hidden h-full flex flex-col gap-4 px-4 pt-5  md:px-8 md:py-6 xl:hidden"
      }
    >
      <h1 className={"text-preset-1 font-bold"}>All Notes</h1>
      <NotesList notesQuery={notes} rootPath={"app/home"} />
    </div>
  );
}
