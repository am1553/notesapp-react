import CreateNewNoteBtn from "../features/notes/components/CreateNewNoteBtn.tsx";
import { NotesList, useNotes } from "../features/notes";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function TagsSidebar() {
  const { tagName } = useParams();
  const { notesQuery } = useNotes({ tag: tagName });
  const { isLoading, isError, data } = notesQuery;
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (inView && data && data.length > 0) {
      navigate(`/app/tags/${tagName}/${data[0].id}`);
    }
  }, [inView, data, navigate]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong...</div>;
  return (
    <aside className={"content-sidebar max-xl:hidden "} ref={ref}>
      <div className={"pl-8 pr-4 flex flex-col gap-2"}>
        <CreateNewNoteBtn />
        <p>
          All notes with the "<span className={"capitalize"}>{tagName}</span>"
          tag are shown here.
        </p>
      </div>
      <NotesList notesQuery={notesQuery} rootPath={`app/tags/${tagName}`} />
    </aside>
  );
}
