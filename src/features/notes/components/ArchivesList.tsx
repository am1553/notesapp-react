import { NotesList } from "../index.ts";
import {useNotes} from "../../../service/useNotes.ts";


export default function ArchivesList() {
  const {useNotesQuery} = useNotes()
  const notes = useNotesQuery({isArchived: true});

  return <NotesList notesQuery={notes} rootPath={"app/archives"} />;
}
