import CreateNewNoteBtn from "../features/notes/components/CreateNewNoteBtn.tsx";
import { NotesList, useNotes } from "../features/notes";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";

export default function HomeSidebar() {
  const { notesQuery } = useNotes();
  const { data, isLoading, isError } = notesQuery;
  const navigate = useNavigate();

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView && data) {
      navigate(`/app/home/${data[0].id}`);
    }
  }, [data, inView, navigate]);

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Something went wrong...</div>;

  return (
    <aside className={"content-sidebar "} ref={ref}>
      <div className={"pl-8 pr-4"}>
        <CreateNewNoteBtn />
      </div>
      <NotesList notesQuery={notesQuery} rootPath={"app/home"} />
    </aside>
  );
}
