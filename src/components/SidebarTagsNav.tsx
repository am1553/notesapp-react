import useTags from "../features/tags/services/useTags.ts";
import { Link, useLocation } from "react-router-dom";
import RightArrowIcon from "../assets/icon-chevron-right.svg";
import TagIcon from "../assets/icon-tag.svg";
import { useStyleContext } from "../context/StyleContext.tsx";

export default function SidebarTagsNav() {
  const { useTagsQuery } = useTags();
  const { theme } = useStyleContext();
  const tags = useTagsQuery();
  const activeNav = useLocation().pathname.split("/")[3];

  if (tags.isLoading) return <div></div>;
  if (tags.isError) return <div>Something went wrong...</div>;
  const data = tags.data || [];
  console.log(data);
  return (
    <nav className={"flex flex-col gap-2"}>
      {data.length > 0 &&
        data.map((tag) => {
          const isActive = activeNav === tag.name;

          return isActive ? (
            <div
              key={tag.id}
              className={`flex items-center justify-between capitalize px-4 py-2.5 rounded-md ${theme === "light" ? "bg-neutral-100" : "bg-neutral-800"} pointer-events-none`}
            >
              <div className={"flex items-center gap-2"}>
                <img
                  src={TagIcon}
                  height={20}
                  width={20}
                  alt={"tag"}
                  className="active-icon"
                />
                <span>{tag.name}</span>
              </div>
              <img
                src={RightArrowIcon}
                height={20}
                width={20}
                alt={"right arrow"}
                className={"filter-white-icon"}
              />
            </div>
          ) : (
            <Link
              key={tag.id}
              to={`tags/${tag.name}`}
              className="flex items-center justify-between capitalize px-4 py-2.5 rounded-md focus"
            >
              <div className={"flex items-center gap-2"}>
                <img src={TagIcon} height={20} width={20} alt={"tag"} />
                <span>{tag.name}</span>
              </div>
              <img
                src={RightArrowIcon}
                height={20}
                width={20}
                alt={"right arrow"}
              />
            </Link>
          );
        })}
    </nav>
  );
}
