import CreateNewNoteBtn from "../features/notes/components/CreateNewNoteBtn.tsx";
import { NotesList, useNotes } from "../features/notes";

export default function HomeSidebar() {
  const { notesQuery } = useNotes();
  if (notesQuery.isLoading) return <div>Loading...</div>;
  if (notesQuery.isError) return <div>Something went wrong...</div>;
  return (
    <aside className={"content-sidebar "}>
      <div className={"pl-8 pr-4"}>
        <CreateNewNoteBtn />
      </div>
      <NotesList notesQuery={notesQuery} rootPath={"app/home"} />
    </aside>
  );
}
