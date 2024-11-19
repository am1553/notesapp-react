import { RadioGroupItem } from "../../../components/ui/radio-group.tsx";
import { Label } from "../../../components/ui/label.tsx";

import { useRef } from "react";
export default function SettingItem({
  title,
  description,
  icon,
  value,
}: {
  title: string;
  description: string;
  icon: string;
  value: "light" | "dark" | "system" | "sans-serif" | "serif" | "monospace";
}) {
  const radioRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => radioRef.current?.click();

  return (
    <div
      className="flex items-center gap-4 p-4 rounded-md stroke-1 stroke-neutral-200 bg-neutral-100 cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex-center h-10 w-10 border-2 border-neutral-200 rounded-xl bg-white pointer-events-none">
        <img src={icon} height={24} width={24} alt="sun" />
      </div>
      <div className="flex flex-col gap-1 flex-1">
        <Label
          htmlFor="r1"
          className={
            "font-semibold text-neutral-700 text-preset-4 pointer-events-none"
          }
        >
          {title}
        </Label>
        <span>{description}</span>
      </div>
      <RadioGroupItem value={value} id={value} ref={radioRef} />
    </div>
  );
}
