import { useLocation } from "react-router-dom";
import HomeSidebar from "./HomeSidebar.tsx";
import ArchivesSidebar from "./ArchivesSidebar.tsx";
import CreateNewNoteBtn from "../features/notes/components/CreateNewNoteBtn.tsx";

function DefaultSidebar() {
  return (
    <aside className={"content-sidebar pl-8 pr-4 "}>
      <div className={""}>
        <CreateNewNoteBtn />
      </div>
      <p>
        You don’t have any notes yet. Start a new note to capture your thoughts
        and ideas.
      </p>
    </aside>
  );
}

export default function ContentSidebar() {
  const location = useLocation();
  const pathname = location.pathname.split("/")[2];
  console.log(pathname);
  return pathname === "home" ? (
    <HomeSidebar />
  ) : pathname === "archives" ? (
    <ArchivesSidebar />
  ) : (
    <DefaultSidebar />
  );
}
