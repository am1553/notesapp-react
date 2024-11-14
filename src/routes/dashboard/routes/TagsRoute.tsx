import TagsList from "../../../features/tags/components/TagsList.tsx";

export default function TagsRoute() {
  return (
    <div
      className={
        "overflow-hidden h-full flex flex-col gap-4 px-4 pt-5  md:px-8 md:py-6 xl:hidden"
      }
    >
      <h1 className={"text-preset-1 font-bold"}>Tags</h1>
      <TagsList />
    </div>
  );
}
