import SearchResults from "./SearchResults.tsx";
import CreateNewNoteBtn from "../features/notes/components/CreateNewNoteBtn.tsx";

export default function SearchSidebar() {
  return (
    <aside className={"content-sidebar max-xl:hidden "}>
      <div className={"pl-8 pr-4 flex flex-col gap-4"}>
        <CreateNewNoteBtn />
      </div>
      <SearchResults />
    </aside>
  );
}
