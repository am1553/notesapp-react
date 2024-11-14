import CreateNewNoteBtn from "../features/notes/components/CreateNewNoteBtn.tsx";
import { NotesList, useNotes } from "../features/notes";

export default function ContentSidebar() {
  const { notesQuery } = useNotes();
  return (
    <aside className={"py-4 overflow-hidden flex flex-col gap-4 border-r "}>
      <div className={"pl-8 pr-4"}>
        <CreateNewNoteBtn />
      </div>
      <NotesList notesQuery={notesQuery} rootPath={"app/notes"} />
    </aside>
  );
}
