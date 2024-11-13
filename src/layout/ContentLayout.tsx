import { Children, ReactNode } from "react";

export default function ContentLayout({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const [contentSidebar, content, actionBar] = Children.toArray(children);
  return (
    <div className={"grid xl:grid-cols-[290px_1fr_290px] h-full " + className}>
      <aside className={"py-4 overflow-hidden flex flex-col gap-4 border-r "}>
        {contentSidebar}
      </aside>
      <div className={"px-8 py-6"}>{content}</div>

      <aside className={"border-l py-4 pl-4 pr-8"}>{actionBar}</aside>
    </div>
  );
}
