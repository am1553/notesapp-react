import { useLocation } from "react-router-dom";
import HomeSidebar from "./HomeSidebar.tsx";
import ArchivesSidebar from "./ArchivesSidebar.tsx";
import CreateNewNoteBtn from "../features/notes/components/CreateNewNoteBtn.tsx";
import TagsSidebar from "./TagsSidebar.tsx";
import SearchSidebar from "./SearchSidebar.tsx";
import SettingsSidebar from "./SettingsSidebar.tsx";
import { Suspense } from "react";
import Loading from "../routes/Loading.tsx";

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
  return pathname === "home" ? (
    <Suspense fallback={<Loading />}>
      <HomeSidebar />
    </Suspense>
  ) : pathname === "archives" ? (
    <Suspense fallback={<Loading />}>
      <ArchivesSidebar />
    </Suspense>
  ) : pathname === "tags" ? (
    <Suspense fallback={<Loading />}>
      <TagsSidebar />
    </Suspense>
  ) : pathname === "search" ? (
    <Suspense fallback={<Loading />}>
      <SearchSidebar />
    </Suspense>
  ) : pathname === "settings" ? (
    <Suspense fallback={<Loading />}>
      <SettingsSidebar />
    </Suspense>
  ) : (
    <Suspense fallback={<Loading />}>
      <DefaultSidebar />
    </Suspense>
  );
}
