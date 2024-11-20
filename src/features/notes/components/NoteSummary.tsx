import moment from "moment";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useStyleContext } from "../../../context/StyleContext.tsx";

export default function NoteSummary({
  note,
  rootPath,
}: {
  note: Note;
  rootPath: string;
}) {
  const [searchParams] = useSearchParams();
  const { theme } = useStyleContext();
  const searchValue = searchParams.get("search");
  const { noteID } = useParams();
  const date = moment().format("D MMM YYYY");
  const isActive = noteID === note.id;

  const tags = note.tags || [];
  const bgColor = theme === "light" ? "bg-neutral-100" : "bg-neutral-900";
  return (
    <Link
      to={`/${rootPath}/${note.id}?search=${searchValue}`}
      className={`w-full text-left flex flex-col gap-3 p-2 rounded-md ${isActive ? `${bgColor} ` : `bg-transparent`} xl:focus transition-all`}
    >
      <h1 className={"text-preset-3 font-semibold capitalize"}>{note.title}</h1>
      <div className="flex gap-1">
        {tags.map((tag) => (
          <span
            key={tag.id}
            className={`${theme === "light" ? "bg-neutral-200" : "bg-neutral-800"}  px-1.5 py-1 rounded-md text-preset-6 capitalize`}
          >
            {tag.name}
          </span>
        ))}
      </div>
      <span
        className={`text-preset-6 ${theme === "light" ? "text-neutral-700" : "border-neutral-200"}`}
      >
        {date}
      </span>
    </Link>
  );
}
