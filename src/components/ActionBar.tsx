import { Button } from "./ui/button.tsx";
import ArchiveIcon from "../assets/icon-archive.svg";
import DeleteIcon from "../assets/icon-delete.svg";
import RestoreIcon from "../assets/icon-restore.svg";
import { useLocation } from "react-router-dom";
export default function ActionBar() {
  const location = useLocation();
  const pathname = location.pathname.split("/");

  return pathname[2] === "notes" ? (
    <div className={"flex flex-col gap-2"}>
      <Button variant={"secondary"} className={"justify-start"}>
        <img src={ArchiveIcon} height={18} width={18} alt="archive" />
        <span>Archive Note</span>
      </Button>
      <Button variant={"secondary"} className={"justify-start"}>
        <img src={DeleteIcon} height={18} width={18} alt="delete" />
        <span>Delete Note</span>
      </Button>
    </div>
  ) : (
    <div className={"flex flex-col gap-2"}>
      <Button variant={"secondary"} className={"justify-start"}>
        <img src={RestoreIcon} height={18} width={18} alt="restore" />
        <span>Restore Note</span>
      </Button>
      <Button variant={"secondary"} className={"justify-start"}>
        <img src={DeleteIcon} height={18} width={18} alt="delete" />
        <span>Delete Note</span>
      </Button>
    </div>
  );
}
