import { NotesList, useNotes } from "../../../features/notes";
import { useParams } from "react-router-dom";
import ContentHeader from "../../../components/ContentHeader.tsx";

export default function TagRoute() {
  const { tagName } = useParams();
  const { notesQuery } = useNotes({ tag: tagName });

  return (
    <div
      className={
        "px-4 py-5 md:px-8 md:py-6 xl:p-0 flex flex-col gap-3 h-full xl:hidden"
      }
    >
      <ContentHeader
        showActionBar={false}
        showSave={false}
        showDelete={false}
        showCancel={false}
        showArchive={false}
      />

      <div className={"flex flex-col gap-2"}>
        <h1 className={"text-neutral-600 text-preset-1 font-bold"}>
          Notes Tagged:{" "}
          <span className={"text-neutral-950 capitalize"}>{tagName}</span>
        </h1>
        <p>
          All notes with the "<span className={"capitalize"}>{tagName}</span>"
          tag are shown here.
        </p>
      </div>

      <NotesList notesQuery={notesQuery} rootPath={"app/home"} />
    </div>
  );
}
