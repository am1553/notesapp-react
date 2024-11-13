import { Children, ReactNode } from "react";
import { NotesList } from "../features/notes";
import CreateNewNote from "../features/notes/components/CreateNewNote.tsx";

export default function ContentLayout({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const [content, sidebar] = Children.toArray(children);
  return (
    <div className={"grid xl:grid-cols-[290px_1fr_290px] h-full " + className}>
      <aside className={"py-4 overflow-hidden flex flex-col gap-4 border-r "}>
        <div className={"pl-8 pr-4"}>
          <CreateNewNote />
        </div>
        <NotesList />
      </aside>
      <div className={"px-8 py-6"}>{content}</div>

      <aside className={"bg-red-600"}>{sidebar}</aside>
    </div>
  );
}
