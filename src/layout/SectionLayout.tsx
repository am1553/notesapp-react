import { ReactNode } from "react";

export default function SectionLayout({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={"grid xl:grid-cols-[290px_1fr_290px] h-full " + className}>
      <aside className={"max-xl:hidden bg-red-600"}></aside>
      <div className={"px-4 py-5 md:px-8 md:py-6"}>{children}</div>
      <aside className={"max-xl:hidden bg-red-600"}></aside>
    </div>
  );
}
