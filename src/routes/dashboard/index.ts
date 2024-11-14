import ProtectedRoutes from "../protected/ProtectedRoutes.tsx";
import DashboardRoute from "./routes/DashboardRoute.tsx";
import NotesRoute from "./routes/NotesRoute.tsx";
import NoteRoute from "./routes/NoteRoute.tsx";
import ArchivesRoute from "./routes/ArchivesRoute.tsx";
import ArchiveRoute from "./routes/ArchiveRoute.tsx";
import TagRoute from "./routes/TagRoute.tsx";
import TagsRoute from "./routes/TagsRoute.tsx";
import TagWithNoteRoute from "./routes/TagWithNoteRoute.tsx";
import SearchRoute from "./routes/SearchRoute.tsx";

const NotesRouter = [
  {
    path: "home",
    Component: NotesRoute,
  },
  {
    path: "home/:noteID",
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

const DashboardRouter = {
  path: "/app",
  Component: ProtectedRoutes,
  children: [
    {
      path: "",
      Component: DashboardRoute,
      children: [
        ...NotesRouter,
        ...ArchivesRouter,
        ...TagRouter,
        ...SearchRouter,
      ],
    },
  ],
};

export default DashboardRouter;
