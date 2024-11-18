import { Button } from "../../../components/ui/button.tsx";
import PlusIcon from "../../../assets/icon-plus.svg";
import { useNavigate } from "react-router-dom";
export default function CreateNewNoteBtn() {
  const navigate = useNavigate();

  const handleNav = () => navigate("/app/create-note");

  return (
    <Button className="" onClick={handleNav}>
      <img src={PlusIcon} alt="plus" height={20} width={20} />
      <span>Create New Note</span>
    </Button>
  );
}
