import CreateNewNoteBtn from "../features/notes/components/CreateNewNoteBtn.tsx";
import { NotesList } from "../features/notes";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useNotes } from "../service/useNotes.ts";

export default function HomeSidebar() {
  const { useNotesQuery } = useNotes();
  const notes = useNotesQuery({ isArchived: false });
  const { data } = notes;
  const navigate = useNavigate();
  const location = useLocation();
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  const pathname = location.pathname.split("/")[2];

  useEffect(() => {
    if (pathname !== "home") return;
    if (inView && data && data.length > 0) {
      navigate(`/app/home/${data[0]?.id}`);
    }
  }, [data, inView, navigate, pathname]);

  if (notes.isLoading) return <div></div>;
  if (notes.isError) return <div>Something went wrong...</div>;
  return (
    <aside className={"content-sidebar "} ref={ref}>
      <div className={"pl-8 pr-4"}>
        <CreateNewNoteBtn />
      </div>
      <NotesList notesQuery={notes} rootPath={"app/home"} />
    </aside>
  );
}
