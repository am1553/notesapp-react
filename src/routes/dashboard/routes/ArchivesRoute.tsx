import ArchivesList from "../../../features/notes/components/ArchivesList.tsx";

export default function ArchivesRoute() {
  return (
    <div
      className={
        "overflow-hidden h-full flex flex-col gap-4 px-4 pt-5  md:px-8 md:py-6 xl:hidden"
      }
    >
      <div className={"flex flex-col gap-2"}>
        <h1 className={"text-preset-1 font-bold"}>Archived Notes</h1>
        <p>
          All your archived notes are stored here. You can restore or delete
          them anytime.
        </p>
      </div>
      <ArchivesList />
    </div>
  );
}
