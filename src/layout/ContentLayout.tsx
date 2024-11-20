import { Children, ReactNode } from "react";
import { useStyleContext } from "../context/StyleContext.tsx";

export default function ContentLayout({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { theme } = useStyleContext();
  const [contentSidebar, content, actionBar] = Children.toArray(children);
  return (
    <div className={"grid xl:grid-cols-[290px_1fr_290px] h-full  " + className}>
      <aside
        className={`py-4 overflow-hidden flex flex-col gap-4 border-r ${theme === "light" ? "border-neutral-200" : "border-neutral-800"} `}
      >
        {contentSidebar}
      </aside>
      <div>{content}</div>

      <aside>{actionBar}</aside>
    </div>
  );
}
