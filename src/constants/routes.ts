import HomeIcon from "../assets/icon-home.svg";
import SearchIcon from "../assets/icon-search.svg";
import ArchiveIcon from "../assets/icon-archive.svg";
import TagIcon from "../assets/icon-tag.svg";
import SettingsIcon from "../assets/icon-settings.svg";
export const ROUTES = [
  {
    path: "/app",
    name: "home",
    label: "Home",
    icon: HomeIcon,
  },
  {
    path: "/app/search",
    name: "search",
    label: "Search",
    icon: SearchIcon,
  },
  {
    path: "/app/archived",
    name: "archived",
    label: "Archived",
    icon: ArchiveIcon,
  },
  {
    path: "/app/tags",
    name: "tags",
    label: "Tags",
    icon: TagIcon,
  },
  {
    path: "/app/settings",
    name: "settings",
    label: "Settings",
    icon: SettingsIcon,
  },
];
