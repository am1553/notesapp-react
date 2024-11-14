import useTags from "../features/tags/services/useTags.ts";
import { Link, useLocation } from "react-router-dom";
import RightArrowIcon from "../assets/icon-chevron-right.svg";
import TagIcon from "../assets/icon-tag.svg";
export default function SidebarTagsNav() {
  const { tagsQuery } = useTags();
  const activeNav = useLocation().pathname.split("/")[3];
  if (tagsQuery.isLoading) return <div>Loading...</div>;
  if (tagsQuery.isError) return <div>Error...</div>;

  return (
    <nav className={"flex flex-col gap-2"}>
      {tagsQuery.data?.map((tag) => (
        <Link
          key={tag.id}
          to={`tags/${tag.name}`}
          className={`flex items-center justify-between capitalize px-4 py-2.5 rounded-md focus ${activeNav === tag.name ? "bg-neutral-100" : "bg-transparent"}`}
        >
          <div className={"flex items-center gap-2"}>
            <img
              src={TagIcon}
              height={20}
              width={20}
              alt={"tag"}
              className={`${activeNav === tag.name ? "active-icon" : null}`}
            />
            <span>{tag.name}</span>
          </div>
          <img
            src={RightArrowIcon}
            height={20}
            width={20}
            alt={"right arrow"}
          />
        </Link>
      ))}
    </nav>
  );
}
