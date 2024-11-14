import { ContentHeader } from "../../../components";
import NoteOverview from "../../../components/NoteOverview.tsx";
import { useNotes } from "../../../features/notes";

export default function ArchiveRoute() {
  const { noteQuery } = useNotes();

  if (noteQuery.isLoading) return <div>Loading...</div>;
  if (noteQuery.isError) return <div>Error</div>;

  const note: Note = noteQuery.data.data;

  return (
    <div className="px-4 py-5 md:px-8 md:py-6 xl:p-0 flex flex-col gap-3 h-full">
      <ContentHeader
        showArchive={true}
        showDelete={true}
        showSave={true}
        showCancel={true}
      />
      <hr className={"xl:hidden"} />
      <NoteOverview note={note} />
    </div>
  );
}
