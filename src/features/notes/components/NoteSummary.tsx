import moment from "moment";
import { Link, useParams, useSearchParams } from "react-router-dom";

export default function NoteSummary({
  note,
  rootPath,
}: {
  note: Note;
  rootPath: string;
}) {
  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get("search");
  const { noteID } = useParams();
  const date = moment().format("D MMM YYYY");
  const isActive = noteID === note.id;

  return (
    <Link
      to={`/${rootPath}/${note.id}?search=${searchValue}`}
      className={`w-full text-left flex flex-col gap-3 p-2 rounded-md xl:hover:scale-110 hover:bg-neutral-50 xl:focus xl:focus:bg-neutral-50 transition-all ${isActive && "bg-neutral-100 xl:scale-105"}`}
    >
      <h1 className={"text-preset-3 font-semibold capitalize"}>{note.title}</h1>
      <div className="flex gap-1">
        {note.tags.map((tag) => (
          <span
            key={tag.id}
            className={"bg-neutral-200 px-1.5 py-1 rounded-md text-preset-6"}
          >
            {tag.name}
          </span>
        ))}
      </div>
      <span className={"text-preset-6 text-neutral-700"}>{date}</span>
    </Link>
  );
}
