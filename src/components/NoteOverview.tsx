import TagIcon from "../assets/icon-tag.svg";
import ClockIcon from "../assets/icon-clock.svg";
import { Button } from "./ui/button.tsx";

export default function NoteOverview({ note }: { note: Note }) {
  return (
    <>
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
      <hr className={"xl:hidden"} />
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
    </>
  );
}
