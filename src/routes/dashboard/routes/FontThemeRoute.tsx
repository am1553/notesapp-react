import SettingItem from "../../../features/settings/components/SettingItem.tsx";
import SansSerifIcon from "../../../assets/icon-font-sans-serif.svg";
import SerifIcon from "../../../assets/icon-font-serif.svg";
import MonospaceIcon from "../../../assets/icon-font-monospace.svg";
import { RadioGroup } from "../../../components/ui/radio-group.tsx";

import SettingPanel from "../../../features/settings/components/SettingPanel.tsx";

export default function FontThemeRoute() {
  return (
    <SettingPanel
      title={"Color Theme"}
      description={"Choose your color theme:"}
    >
      <RadioGroup
        defaultValue="dark-theme"
        className="flex flex-col gap-2 md:gap-4 my-1"
      >
        <SettingItem
          title={"Sans-serif"}
          description={"Clean and modern, easy to read."}
          icon={SansSerifIcon}
          value={"sans-serif"}
        />
        <SettingItem
          title={"Serif"}
          description={"Classic and elegant for a timeless feel."}
          icon={SerifIcon}
          value={"serif"}
        />
        <SettingItem
          title={"Monospace"}
          description={"Code-like, great for a technical vibe."}
          icon={MonospaceIcon}
          value={"monospace"}
        />
      </RadioGroup>
    </SettingPanel>
  );
}
