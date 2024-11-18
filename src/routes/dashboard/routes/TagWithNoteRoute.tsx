import NoteOverview from "../../../components/NoteOverview.tsx";
import ContentHeader from "../../../components/ContentHeader.tsx";
import {useNotes} from "../../../service/useNotes.ts";

export default function TagWithNoteRoute() {
    const {useNotesQuery} = useNotes()
    const notes = useNotesQuery()
  if (notes.isLoading) return <div>Loading...</div>;
  if (notes.isError) return <div>Error...</div>;

  return (
    <div className="px-4 py-5 md:px-8 md:py-6 xl:p-0 flex flex-col gap-3 h-full">
      <ContentHeader
        showArchive={true}
        showCancel={true}
        showDelete={true}
        showSave={true}
      />
      <hr className={"xl:hidden"} />
      <NoteOverview note={notes.data} />
    </div>
  );
}
