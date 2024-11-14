import SettingPanel from "../../../features/settings/components/SettingPanel.tsx";
import { RadioGroup } from "../../../components/ui/radio-group.tsx";
import SettingItem from "../../../features/settings/components/SettingItem.tsx";
import SunIcon from "../../../assets/icon-sun.svg";
import MoonIcon from "../../../assets/icon-moon.svg";
import SystemsIcon from "../../../assets/icon-system-theme.svg";

export default function ThemeRoute() {
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
          title={"Light Mode"}
          description={"Pick a clean and classic light theme"}
          icon={SunIcon}
          value={"light-theme"}
        />
        <SettingItem
          title={"Dark Mode"}
          description={"Select a sleek and modern dark theme"}
          icon={MoonIcon}
          value={"dark-theme"}
        />
        <SettingItem
          title={"System"}
          description={"Adapts to your device’s theme"}
          icon={SystemsIcon}
          value={"system-theme"}
        />
      </RadioGroup>
    </SettingPanel>
  );
}
