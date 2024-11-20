import TagsList from "../../../features/tags/components/TagsList.tsx";
import { useStyleContext } from "../../../context/StyleContext.tsx";

export default function TagsRoute() {
  const { theme } = useStyleContext();
  return (
    <div
      className={`overflow-hidden h-full flex flex-col gap-4 px-4 pt-5  md:px-8 md:py-6 xl:hidden ${theme === "light" ? "bg-white" : "bg-neutral-950"}`}
    >
      <h1 className={"text-preset-1 font-bold"}>Tags</h1>
      <TagsList />
    </div>
  );
}
