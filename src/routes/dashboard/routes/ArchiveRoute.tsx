import NoteOverview from "../../../components/NoteOverview.tsx";
import ContentHeader from "../../../components/ContentHeader.tsx";
import {useNotes} from "../../../service/useNotes.ts";
import {useParams} from "react-router-dom";

export default function ArchiveRoute() {
    const {noteID} = useParams()
  const { useNoteQuery } = useNotes();
    const note = useNoteQuery(noteID!)
  if (note.isLoading) return <div>Loading...</div>;
  if (note.isError) return <div>Error</div>;

  return (
    <div className="px-4 py-5 md:px-8 md:py-6 xl:p-0 flex flex-col gap-3 h-full">
      <ContentHeader
        showArchive={true}
        showDelete={true}
        showSave={true}
        showCancel={true}
      />
      <hr className={"xl:hidden"} />
      <NoteOverview note={note.data} />
    </div>
  );
}
