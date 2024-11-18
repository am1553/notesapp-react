import NoteSummary from "./NoteSummary.tsx";
import { UseQueryResult } from "@tanstack/react-query";

export default function NotesList({
  notesQuery,
  rootPath,
  emptyMessage,
}: {
  notesQuery: UseQueryResult<any, Error>;
  rootPath: string;
  emptyMessage?: string;
}) {
  if (notesQuery.isLoading || notesQuery.isError) return <div>Loading...</div>;

  return notesQuery.data < 1 ? (
    <div className={" max-xl:pb-10 xl:pl-8 xl:pr-4 xl:pt-2 xl:pb-12"}>
      <p className="bg-neutral-100 rounded-md p-2">
        {emptyMessage
          ? emptyMessage
          : "You don’t have any notes yet. Start a new note to capture your thoughts and ideas."}
      </p>
    </div>
  ) : (
    <ul
      className={
        "h-full max-xl:pb-10 xl:pl-8 xl:pr-4 xl:pt-2 xl:pb-12 overflow-y-auto"
      }
    >
      {notesQuery.data.map((note: Note, i: number) => (
        <li key={note.id}>
          <NoteSummary note={note} rootPath={rootPath} />
          {i < notesQuery.data.length - 1 ? <hr className={"my-2"} /> : null}
        </li>
      ))}
    </ul>
  );
}
