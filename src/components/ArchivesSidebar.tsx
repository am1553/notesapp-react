import { NotesList, useNotes } from "../features/notes";
import CreateNewNoteBtn from "../features/notes/components/CreateNewNoteBtn.tsx";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function ArchivesSidebar() {
  const { notesQuery } = useNotes({ isArchived: true });
  const { data, isLoading, isError } = notesQuery;
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const navigate = useNavigate();
  React.useEffect(() => {
    if (inView && data) {
      navigate(`/app/archives/${data[0].id}`);
    }
  }, [inView, data, navigate]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong...</div>;
  return (
    <aside className={"content-sidebar "} ref={ref}>
      <div className={"pl-8 pr-4 flex flex-col gap-2"}>
        <CreateNewNoteBtn />
        <p>
          All your archived notes are stored here. You can restore or delete
          them anytime.
        </p>
      </div>
      <NotesList notesQuery={notesQuery} rootPath={"app/archives"} />
    </aside>
  );
}
