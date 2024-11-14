import { NotesList, useNotes } from "../../features/notes";

export default function NotesRoute() {
  const { notesQuery } = useNotes();
  return (
    <div
      className={
        "overflow-hidden h-full flex flex-col gap-4 px-4 pt-5  md:px-8 md:py-6 xl:hidden"
      }
    >
      <h1 className={"text-preset-1 font-bold"}>All Notes</h1>
      <NotesList notesQuery={notesQuery} rootPath={"app/notes"} />
    </div>
  );
}
