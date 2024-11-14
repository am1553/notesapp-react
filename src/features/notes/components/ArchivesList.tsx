import { NotesList, useNotes } from "../index.ts";

export default function ArchivesList() {
  const { notesQuery } = useNotes({ isArchived: true });

  return <NotesList notesQuery={notesQuery} rootPath={"app/archives"} />;
}
