import { useLocation } from "react-router-dom";
import HomeSidebar from "./HomeSidebar.tsx";
import ArchivesSidebar from "./ArchivesSidebar.tsx";
import CreateNewNoteBtn from "../features/notes/components/CreateNewNoteBtn.tsx";
import TagsSidebar from "./TagsSidebar.tsx";
import SearchSidebar from "./SearchSidebar.tsx";
import SettingsSidebar from "./SettingsSidebar.tsx";

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

  switch (pathname) {
    case "home":
      return <HomeSidebar />;
    case "create-note":
      return <HomeSidebar />;
    case "archives":
      return <ArchivesSidebar />;
    case "tags":
      return <TagsSidebar />;
    case "search":
      return <SearchSidebar />;
    case "settings":
      return <SettingsSidebar />;
    default:
      return <DefaultSidebar />;
  }
}
