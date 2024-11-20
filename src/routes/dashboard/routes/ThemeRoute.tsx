import SettingPanel from "../../../features/settings/components/SettingPanel.tsx";
import { RadioGroup } from "../../../components/ui/radio-group.tsx";
import SettingItem from "../../../features/settings/components/SettingItem.tsx";
import SunIcon from "../../../assets/icon-sun.svg";
import MoonIcon from "../../../assets/icon-moon.svg";
import SystemsIcon from "../../../assets/icon-system-theme.svg";
import { useSettings } from "../../../service/useSettings.ts";

export default function ThemeRoute() {
  const { useSettingsQuery, useUpdateSettings } = useSettings();
  const settingsQuery = useSettingsQuery();
  const settings = settingsQuery.data;
  const updateSettings = useUpdateSettings();
  const handleUpdateTheme = async (theme: "dark" | "light" | "system") => {
    await updateSettings.mutateAsync({
      theme,
    });
  };
  if (settingsQuery.isLoading) return <div></div>;
  if (settingsQuery.isError) return <div>Something went wrong...</div>;
  return (
    <SettingPanel
      title={"Color Theme"}
      description={"Choose your color theme:"}
    >
      <RadioGroup
        defaultValue={settings.theme || "dark"}
        className="flex flex-col gap-2 md:gap-4 my-1"
        onValueChange={handleUpdateTheme}
      >
        <SettingItem
          title={"Light Mode"}
          description={"Pick a clean and classic light theme"}
          icon={SunIcon}
          value={"light"}
        />
        <SettingItem
          title={"Dark Mode"}
          description={"Select a sleek and modern dark theme"}
          icon={MoonIcon}
          value={"dark"}
        />
        <SettingItem
          title={"System"}
          description={"Adapts to your device’s theme"}
          icon={SystemsIcon}
          value={"system"}
        />
      </RadioGroup>
    </SettingPanel>
  );
}
