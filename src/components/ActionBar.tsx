import { useLocation } from "react-router-dom";

import { useNotes } from "../service/useNotes.ts";
import ActionDialog from "../actions/ActionDialog.tsx";
import { useStyleContext } from "../context/StyleContext.tsx";
export default function ActionBar() {
  const { useNotesQuery } = useNotes();
  const location = useLocation();
  const pathname = location.pathname.split("/");
  const notes = useNotesQuery({
    isArchived: pathname[2] !== "home",
  });
  const { theme } = useStyleContext();
  if (notes.isLoading) return <div></div>;
  if (notes.isError) return <div>Something went wrong...</div>;

  return pathname[2] === "home" && notes.data?.length > 0 ? (
    <div
      className={`flex flex-col gap-3 border-l h-full py-4 pl-4 pr-8 ${theme === "light" ? "border-neutral-200" : "border-neutral-800"}`}
    >
      <ActionDialog type={"archive"} />
      <ActionDialog type={"delete"} />
    </div>
  ) : pathname[2] === "archives" && notes.data?.length > 0 ? (
    <div
      className={`flex flex-col gap-3 border-l h-full py-4 pl-4 pr-8 ${theme === "light" ? "border-neutral-200" : "border-neutral-800"}`}
    >
      <ActionDialog type={"restore"} />
      <ActionDialog type={"delete"} />
    </div>
  ) : pathname[2] === "tags" && notes.data?.length > 0 ? (
    <div
      className={`flex flex-col gap-3 border-l h-full py-4 pl-4 pr-8 ${theme === "light" ? "border-neutral-200" : "border-neutral-800"}`}
    >
      <ActionDialog type={"delete"} />
    </div>
  ) : null;
}
