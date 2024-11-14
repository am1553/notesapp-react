import { useNotes } from "../../../features/notes";
import { ContentHeader } from "../../../components";
import NoteOverview from "../../../components/NoteOverview.tsx";

export default function NoteRoute() {
  const { noteQuery } = useNotes();

  if (noteQuery.isLoading) return <div>Loading...</div>;
  if (noteQuery.isError) return <div>Error</div>;

  const note: Note = noteQuery.data.data;

  return (
    <div className="px-4 py-5 md:px-8 md:py-6 xl:p-0 flex flex-col gap-3 h-full">
      <ContentHeader
        showArchive={true}
        showCancel={true}
        showDelete={true}
        showSave={true}
      />
      <hr className={"xl:hidden"} />
      <NoteOverview note={note} />
    </div>
  );
}
