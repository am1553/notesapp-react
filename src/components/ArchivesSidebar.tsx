import { NotesList, useNotes } from "../features/notes";
import CreateNewNoteBtn from "../features/notes/components/CreateNewNoteBtn.tsx";

export default function ArchivesSidebar() {
  const { notesQuery } = useNotes({ isArchived: true });
  if (notesQuery.isLoading) return <div>Loading...</div>;
  if (notesQuery.isError) return <div>Something went wrong...</div>;
  return (
    <aside className={"content-sidebar "}>
      <div className={"pl-8 pr-4 flex flex-col gap-2"}>
        <CreateNewNoteBtn />
        <p>
          All your archived notes are stored here. You can restore or delete
          them anytime.
        </p>
      </div>
      <NotesList notesQuery={notesQuery} rootPath={"app/archives"} />
    </aside>
  );
}
