import { NotesList } from "../features/notes";
import CreateNewNoteBtn from "../features/notes/components/CreateNewNoteBtn.tsx";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useNotes } from "../service/useNotes.ts";

export default function ArchivesSidebar() {
  const { useNotesQuery } = useNotes();
  const notes = useNotesQuery({ isArchived: true });
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const navigate = useNavigate();
  React.useEffect(() => {
    if (inView && notes.data && notes.data.length > 0) {
      navigate(`/app/archives/${notes.data[0].id}`);
    }
  }, [inView, notes.data, navigate]);

  if (notes.isLoading) return <div>Loading...</div>;
  if (notes.isError) return <div>Something went wrong...</div>;

  return (
    <aside className={"content-sidebar "} ref={ref}>
      <div className={"pl-8 pr-4 flex flex-col gap-2"}>
        <CreateNewNoteBtn />
        <p>
          All your archived notes are stored here. You can restore or delete
          them anytime.
        </p>
      </div>
      <NotesList notesQuery={notes} rootPath={"app/archives"} />
    </aside>
  );
}
