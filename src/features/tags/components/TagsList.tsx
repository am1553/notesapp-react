import useTags from "../services/useTags.ts";
import { Link } from "react-router-dom";
import TagIcon from "../../../assets/icon-tag.svg";
export default function TagsList() {
  const { tagsQuery } = useTags();

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
            {i < tags!.length - 1 ? <hr /> : null}
          </div>
        ))
      )}
    </ul>
  );
}
