import useNotes from "../services/useNotes.ts";
import NoteSummary from "./NoteSummary.tsx";

export default function NotesList() {
  const { notesQuery } = useNotes();

  if (notesQuery.isLoading) return <div>Loading...</div>;
  if (notesQuery.isError) return <div>Error</div>;

  return notesQuery.data < 1 ? (
    <div className={"bg-neutral-100 rounded-md p-2"}>
      <p className="">
        You don’t have any notes yet. Start a new note to capture your thoughts
        and ideas.
      </p>
    </div>
  ) : (
    <ul className={"h-full xl:pl-8 xl:pr-4 xl:pt-2 xl:pb-12 overflow-y-auto"}>
      {notesQuery.data.map((note: Note, i: number) => (
        <li key={note.id}>
          <NoteSummary note={note} />
          {i < notesQuery.data.length - 1 ? <hr className={"my-2"} /> : null}
        </li>
      ))}
    </ul>
  );
}
