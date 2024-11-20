import SettingItem from "../../../features/settings/components/SettingItem.tsx";
import SansSerifIcon from "../../../assets/icon-font-sans-serif.svg";
import SerifIcon from "../../../assets/icon-font-serif.svg";
import MonospaceIcon from "../../../assets/icon-font-monospace.svg";
import { RadioGroup } from "../../../components/ui/radio-group.tsx";
import SettingPanel from "../../../features/settings/components/SettingPanel.tsx";
import { useSettings } from "../../../service/useSettings.ts";

export default function FontThemeRoute() {
  const { useUpdateSettings, useSettingsQuery } = useSettings();
  const settingsQuery = useSettingsQuery();
  const updateSettings = useUpdateSettings();

  const handleUpdateFont = async (
    font: "sans-serif" | "serif" | "monospace",
  ) => {
    await updateSettings.mutateAsync({
      font,
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
        defaultValue={settingsQuery.data.font || "sans-serif"}
        className="flex flex-col gap-2 md:gap-4 my-1"
        onValueChange={handleUpdateFont}
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
