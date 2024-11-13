import { Link } from "react-router-dom";
import LeftArrowIcon from "../../assets/icon-arrow-left.svg";
import BinIcon from "../../assets/icon-delete.svg";
import ArchiveIcon from "../../assets/icon-archive.svg";
import TagIcon from "../../assets/icon-tag.svg";
import ClockIcon from "../../assets/icon-clock.svg";
import { useNotes } from "../../features/notes";
import { Button } from "../../components/ui/button.tsx";

export default function NoteRoute() {
  const { noteQuery } = useNotes();

  if (noteQuery.isLoading) return <div>Loading...</div>;
  if (noteQuery.isError) return <div>Error</div>;

  const note: Note = noteQuery.data.data;
  console.log(note);
  return (
    <div className="px-4 py-5 md:px-8 md:py-6 xl:p-0 flex flex-col gap-3 h-full">
      <div
        className={
          "flex justify-between items-center text-neutral-600 xl:hidden"
        }
      >
        <Link to={`/app/notes`} className={"flex items-center gap-2"}>
          <img src={LeftArrowIcon} height={18} width={18} alt="left arrow" />
          <span>Go Back</span>
        </Link>

        <div className={"flex items-center gap-4"}>
          <button className={"h-fit w-fit flex-center"}>
            <img src={BinIcon} height={18} width={18} alt="bin" />
          </button>
          <button className={"h-fit w-fit flex-center"}>
            <img src={ArchiveIcon} height={18} width={18} alt="archive" />
          </button>
          <button className={""}>Cancel</button>
          <button className={"text-blue-500"}>Save Note</button>
        </div>
      </div>
      <hr className={"xl:hidden"} />

      <div className={"py-3 flex flex-col gap-3"}>
        <h1 className={"text-preset-1 font-bold capitalize"}>{note.title}</h1>

        <div
          className={
            "grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-1 text-preset-6 text-neutral-600"
          }
        >
          <div className={"col-start-1 flex items-center gap-1.5"}>
            <img src={TagIcon} height={16} width={16} alt="tag" />
            <span>Tags</span>
          </div>
          <p className={"col-start-2"}>Dev, React</p>
          <div className={"col-start-1 flex items-center gap-1.5"}>
            <img src={ClockIcon} height={16} width={16} alt="clock" />
            <span>Last edited</span>
          </div>
          <p className={"col-start-2"}>29 Oct 2024</p>
        </div>
      </div>

      <hr />

      <textarea
        placeholder={"Start typing your note here..."}
        name={"description"}
        id=""
        className={"h-full text-neutral-800 outline-none"}
        defaultValue={note.description.replace(/\\n/g, "\n")}
      />
      <hr className={"max-xl:hidden"} />
      <div className={"flex w-fit gap-4 max-xl:hidden"}>
        <Button>Save Note</Button>
        <Button variant={"secondary"}>Cancel</Button>
      </div>
    </div>
  );
}
