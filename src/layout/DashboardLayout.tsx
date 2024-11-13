import { Header, MenuBar, Sidebar } from "../components";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={
        "h-screen w-screen max-xl:bg-neutral-100 grid grid-rows-[54px_1fr_56px] md:grid-rows-[74px_1fr_74px] xl:grid-cols-[272px_1fr] xl:grid-rows-[80px_1fr]"
      }
    >
      <Sidebar className={"col-start-1 row-start-1 row-span-2 max-xl:hidden"} />
      <Header className={"xl:col-start-2 xl:row-start-1"} />
      <section
        className={
          "xl:col-start-2 row-start-2 h-full bg-white max-xl:shadow-[0px_0px_10px_2px_#00000010] max-xl:rounded-t-xl xl:border-t"
        }
      >
        {children}
      </section>
      <MenuBar className={"xl:hidden"} />
    </div>
  );
}
