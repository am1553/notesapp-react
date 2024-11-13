import { Button } from "../../../components/ui/button.tsx";
import PlusIcon from "../../../assets/icon-plus.svg";
export default function CreateNewNote() {
  return (
    <Button className="">
      <img src={PlusIcon} alt="plus" height={20} width={20} />
      <span>Create New Note</span>
    </Button>
  );
}
