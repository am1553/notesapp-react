import { Link } from "react-router-dom";
import LogoIcon from "../assets/logo.svg";
export default function Logo({ className }: { className?: string }) {
  return (
    <Link to="/app/home" className={"flex gap-2 " + className}>
      <img src={LogoIcon} height={24} width={24} alt="" />
      <span className={"font-pacifico text-preset-1"}>Notes</span>
    </Link>
  );
}
