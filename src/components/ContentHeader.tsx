import { Link } from "react-router-dom";
import LeftArrowIcon from "../assets/icon-arrow-left.svg";
import BinIcon from "../assets/icon-delete.svg";
import ArchiveIcon from "../assets/icon-archive.svg";

export default function ContentHeader({ rootPath }: { rootPath: string }) {
  return (
    <div
      className={"flex justify-between items-center text-neutral-600 xl:hidden"}
    >
      <Link to={`/${rootPath}`} className={"flex items-center gap-2"}>
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
  );
}
