import { useNavigate } from "react-router-dom";
import LeftArrowIcon from "../assets/icon-arrow-left.svg";
import BinIcon from "../assets/icon-delete.svg";
import ArchiveIcon from "../assets/icon-archive.svg";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog.tsx";
import RestoreIcon from "../assets/icon-restore.svg";
import { useStyleContext } from "../context/StyleContext.tsx";

type Props = {
  showAction?: boolean;
  onSave?: () => void;
  onArchive?: () => void;
  onDelete?: () => void;
  isArchived?: boolean;
};

export default function ContentHeader({
  onSave,
  onArchive,
  onDelete,
  isArchived,
  showAction = true,
}: Props) {
  const navigate = useNavigate();
  const { theme } = useStyleContext();
  return (
    <div
      className={`flex text-preset-6 justify-between items-center text-neutral-600 xl:hidden ${theme === "light" ? "text-neutral-800" : "text-white"}`}
    >
      <button
        onClick={() => navigate(-1)}
        className={"flex items-center gap-2"}
      >
        <img
          src={LeftArrowIcon}
          height={18}
          width={18}
          alt="left arrow"
          className={`${theme === "light" ? "" : "filter-white-icon"}`}
        />
        <span>Go Back</span>
      </button>
      <div className={"flex-center gap-3"}>
        {showAction && (
          <>
            <Dialog>
              <DialogTrigger>
                <div className={"h-fit w-fit flex-center"}>
                  <img
                    src={BinIcon}
                    height={18}
                    width={18}
                    alt="bin"
                    className={`${theme === "light" ? "" : "filter-white-icon"}`}
                  />
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader className={""}>
                  <DialogTitle className={"max-xl:text-center"}>
                    Are you sure?
                  </DialogTitle>
                  <DialogDescription className={"max-xl:text-center"}>
                    This will permanently delete the note and cannot be
                    restored.
                  </DialogDescription>
                </DialogHeader>
                <div className={"flex gap-4 w-full max-xl:justify-center"}>
                  <DialogClose
                    onClick={() => {
                      onDelete!();
                      navigate(-1);
                    }}
                    className={
                      "w-fit inline-flex items-center justify-start px-4 py-3 bg-red-500 text-white hover:bg-red-600 hover:outline-neutral-300 hover:outline focus gap-2 whitespace-nowrap rounded-lg text-preset-4 font-medium transition-colors focus disabled:pointer-events-none disabled:opacity-50"
                    }
                  >
                    <span>Delete Note</span>
                  </DialogClose>
                  <DialogClose
                    className={
                      "w-fit inline-flex items-center justify-start px-4 py-3 bg-neutral-100 text-neutral-600 hover:bg-white hover:outline-neutral-300 hover:outline focus gap-2 whitespace-nowrap rounded-lg text-preset-4 font-medium transition-colors focus disabled:pointer-events-none disabled:opacity-50"
                    }
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger>
                <div className={"h-fit w-fit flex-center"}>
                  <img
                    src={isArchived ? RestoreIcon : ArchiveIcon}
                    height={18}
                    width={18}
                    alt="archive"
                    className={`${theme === "light" ? "" : "filter-white-icon"}`}
                  />
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className={"max-xl:text-center"}>
                    Are you sure?
                  </DialogTitle>
                  <DialogDescription className={"max-xl:text-center"}>
                    {isArchived
                      ? "This will remove the note from archives."
                      : "This will move the note to archives."}
                  </DialogDescription>
                </DialogHeader>
                <div className={"flex gap-4 w-full max-xl:justify-center"}>
                  <DialogClose
                    onClick={onArchive}
                    className={
                      "w-fit inline-flex items-center justify-start px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white hover:outline-neutral-300 hover:outline focus gap-2 whitespace-nowrap rounded-lg text-preset-4 font-medium transition-colors focus disabled:pointer-events-none disabled:opacity-50"
                    }
                  >
                    <span>{isArchived ? "Restore Note" : "Archive Note"}</span>
                  </DialogClose>
                  <DialogClose
                    className={
                      "w-fit inline-flex items-center justify-start px-4 py-3 bg-neutral-100 text-neutral-600 hover:bg-white hover:outline-neutral-300 hover:outline focus gap-2 whitespace-nowrap rounded-lg text-preset-4 font-medium transition-colors focus disabled:pointer-events-none disabled:opacity-50"
                    }
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
          </>
        )}
        <button onClick={() => navigate(-1)}>
          <span>Cancel</span>
        </button>
        <button className={"text-blue-500"} onClick={onSave}>
          <span>Save</span>
        </button>
      </div>
    </div>
  );
}
