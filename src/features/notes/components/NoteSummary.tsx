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

  const tags = note.tags || [];
  return isActive ? (
    <div
      className={`w-full text-left flex flex-col gap-3 p-2 rounded-md bg-neutral-100 xl:scale-105 transition-all`}
    >
      <h1 className={"text-preset-3 font-semibold capitalize"}>{note.title}</h1>
      <div className="flex gap-1">
        {tags.map((tag) => {
          if (!tag) return;
          return (
            <span
              key={tag.id}
              className={
                "bg-neutral-200 px-1.5 py-1 rounded-md text-preset-6 capitalize"
              }
            >
              {tag.name}
            </span>
          );
        })}
      </div>
      <span className={"text-preset-6 text-neutral-700"}>{date}</span>
    </div>
  ) : (
    <Link
      to={`/${rootPath}/${note.id}?search=${searchValue}`}
      className={`w-full text-left flex flex-col gap-3 p-2 rounded-md xl:hover:scale-110 hover:bg-neutral-50 xl:focus xl:focus:bg-neutral-50 transition-all ${isActive && "bg-neutral-100 xl:scale-105"}`}
    >
      <h1 className={"text-preset-3 font-semibold capitalize"}>{note.title}</h1>
      <div className="flex gap-1">
        {tags.map((tag) => (
          <span
            key={tag.id}
            className={
              "bg-neutral-200 px-1.5 py-1 rounded-md text-preset-6 capitalize"
            }
          >
            {tag.name}
          </span>
        ))}
      </div>
      <span className={"text-preset-6 text-neutral-700"}>{date}</span>
    </Link>
  );
}
