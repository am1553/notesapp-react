import useTags from "../services/useTags.ts";
import { Link } from "react-router-dom";
import TagIcon from "../../../assets/icon-tag.svg";
import { useStyleContext } from "../../../context/StyleContext.tsx";
export default function TagsList() {
  const { useTagsQuery } = useTags();
  const { theme } = useStyleContext();
  const tagsQuery = useTagsQuery();

  if (tagsQuery.isLoading) return <div>Loading...</div>;
  if (tagsQuery.isError) return <div>Error...</div>;
  const tags = tagsQuery.data;
  return (
    <ul className={"flex flex-col"}>
      {tags!.length < 1 ? (
        <div>No tags</div>
      ) : (
        tags!.map((tag, i) => (
          <div key={tag.id}>
            <Link to={tag.name} className={"py-2.5 flex gap-2 capitalize"}>
              <img src={TagIcon} height={24} width={24} alt="tag" />
              <span>{tag.name}</span>
            </Link>
            {i < tags!.length - 1 ? (
              <hr
                className={`my-2 ${theme === "light" ? "border-neutral-200" : "border-neutral-800"}`}
              />
            ) : null}
          </div>
        ))
      )}
    </ul>
  );
}
