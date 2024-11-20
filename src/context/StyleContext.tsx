import React, {
  createContext,
  SetStateAction,
  useContext,
  useEffect,
} from "react";
import { useSettings } from "../service/useSettings.ts";

type Font = "sans-serif" | "serif" | "monospace";
type Theme = "light" | "dark";

type StyleContextType = {
  theme: Theme;
  font: Font;
  setFont: React.Dispatch<
    React.SetStateAction<"sans-serif" | "serif" | "monospace">
  >;
  setTheme: React.Dispatch<SetStateAction<"light" | "dark">>;
};

const defaultValue = {
  theme: "light",
  font: "sans-serif",
  setFont: () => {},
  setTheme: () => {},
} as StyleContextType;

export const StyleContext = createContext<StyleContextType>(defaultValue);

export function StyleProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");
  const { useSettingsQuery } = useSettings();
  const [font, setFont] = React.useState<"sans-serif" | "serif" | "monospace">(
    "sans-serif",
  );

  const settings = useSettingsQuery();

  useEffect(() => {
    if (settings.isLoading || settings.isError) return;
    const { theme: sTheme, font: sFont } = settings.data;
    if (sTheme === "system") {
      const sysTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

      setTheme(sysTheme);
    } else {
      setTheme(sTheme);
    }
    setFont(sFont);
  }, [settings]);

  const fStyle =
    font === "serif"
      ? "font-noto-serif"
      : font === "monospace"
        ? "font-source-code-pro"
        : "font-inter";

  const value: StyleContextType = { theme, font, setFont, setTheme };
  return (
    <StyleContext.Provider value={value}>
      <div
        className={` ${fStyle} ${theme === "light" ? "bg-white text-neutral-700" : "bg-neutral-950 text-neutral-200"}`}
      >
        {children}
      </div>
    </StyleContext.Provider>
  );
}

export const useStyleContext = () => useContext(StyleContext);
