import NotesRoute from "./routes/NotesRoute.tsx";
import NoteRoute from "./routes/NoteRoute.tsx";
import ArchivesRoute from "./routes/ArchivesRoute.tsx";
import ArchiveRoute from "./routes/ArchiveRoute.tsx";
import TagsRoute from "./routes/TagsRoute.tsx";
import TagRoute from "./routes/TagRoute.tsx";
import TagWithNoteRoute from "./routes/TagWithNoteRoute.tsx";
import SearchRoute from "./routes/SearchRoute.tsx";
import SettingsRoute from "./routes/SettingsRoute.tsx";
import ThemeRoute from "./routes/ThemeRoute.tsx";
import FontThemeRoute from "./routes/FontThemeRoute.tsx";
import ProtectedRoutes from "../protected/ProtectedRoutes.tsx";
import DashboardRoute from "./routes/DashboardRoute.tsx";
import ChangePasswordRoute from "./routes/ChangePasswordRoute.tsx";
import CreateNoteRoute from "./routes/CreateNoteRoute.tsx";

const NotesRouter = [
  {
    path: "home",
    Component: NotesRoute,
  },
  {
    path: "home/:noteID",
    Component: NoteRoute,
  },
  {
    path: "home/create-note",
    Component: NoteRoute,
  },
];

const ArchivesRouter = [
  {
    path: "archives",
    Component: ArchivesRoute,
  },
  {
    path: "archives/:noteID",
    Component: ArchiveRoute,
  },
];

const TagRouter = [
  {
    path: "tags",
    Component: TagsRoute,
  },
  {
    path: "tags/:tagName",
    Component: TagRoute,
  },
  { path: "tags/:tagName/:noteID", Component: TagWithNoteRoute },
];

const SearchRouter = [
  {
    path: "search",
    Component: SearchRoute,
  },
  {
    path: "search/:noteID",
    Component: NoteRoute,
  },
];

const SettingsRouter = [
  {
    path: "settings",
    Component: SettingsRoute,
  },
  {
    path: "settings/theme",
    Component: ThemeRoute,
  },
  {
    path: "settings/font",
    Component: FontThemeRoute,
  },
  {
    path: "settings/change-password",
    Component: ChangePasswordRoute,
  },
];

const DashboardRouter = {
  path: "/app",
  Component: ProtectedRoutes,
  children: [
    {
      path: "",
      Component: DashboardRoute,
      children: [
        { path: "create-note", Component: CreateNoteRoute },
        ...NotesRouter,
        ...ArchivesRouter,
        ...TagRouter,
        ...SearchRouter,
        ...SettingsRouter,
      ],
    },
  ],
};

export default DashboardRouter;
