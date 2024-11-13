import { NotesList } from "../../features/notes";

export default function NotesRoute() {
  return (
    <div className={"overflow-hidden px-4 py-5 md:px-8 md:py-6 xl:hidden"}>
      <h1 className={"text-preset-1 font-bold"}>All Notes</h1>
      <NotesList />
    </div>
  );
}
