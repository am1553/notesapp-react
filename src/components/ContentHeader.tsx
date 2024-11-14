import { useNavigate } from "react-router-dom";
import LeftArrowIcon from "../assets/icon-arrow-left.svg";
import BinIcon from "../assets/icon-delete.svg";
import ArchiveIcon from "../assets/icon-archive.svg";

type Props = {
  showActionBar?: boolean;
  showDelete: boolean;
  showArchive: boolean;
  showCancel: boolean;
  showSave: boolean;
};

export default function ContentHeader({
  showArchive,
  showSave,
  showCancel,
  showDelete,
  showActionBar = true,
}: Props) {
  const navigate = useNavigate();
  return (
    <div
      className={"flex justify-between items-center text-neutral-600 xl:hidden"}
    >
      <button
        onClick={() => navigate(-1)}
        className={"flex items-center gap-2"}
      >
        <img src={LeftArrowIcon} height={18} width={18} alt="left arrow" />
        <span>Go Back</span>
      </button>

      {showActionBar && (
        <div className={"flex items-center gap-4"}>
          {showDelete && (
            <button className={"h-fit w-fit flex-center"}>
              <img src={BinIcon} height={18} width={18} alt="bin" />
            </button>
          )}
          {showArchive && (
            <button className={"h-fit w-fit flex-center"}>
              <img src={ArchiveIcon} height={18} width={18} alt="archive" />
            </button>
          )}
          {showCancel && <button className={""}>Cancel</button>}
          {showSave && <button className={"text-blue-500"}>Save Note</button>}
        </div>
      )}
    </div>
  );
}
