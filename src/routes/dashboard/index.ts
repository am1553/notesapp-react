import ProtectedRoutes from "../protected/ProtectedRoutes.tsx";
import DashboardRoute from "./DashboardRoute.tsx";
import NotesRoute from "./NotesRoute.tsx";
import NoteRoute from "./NoteRoute.tsx";
import ArchivesRoute from "./ArchivesRoute.tsx";
import ArchiveRoute from "./ArchiveRoute.tsx";

const NotesRouter = [
  {
    path: "notes",
    Component: NotesRoute,
  },
  {
    path: "notes/:noteID",
    Component: NoteRoute,
  },
];

const ArchivedRouter = [
  {
    path: "archives",
    Component: ArchivesRoute,
  },
  {
    path: "archives/:noteID",
    Component: ArchiveRoute,
  },
];

const DashboardRouter = {
  path: "/app",
  Component: ProtectedRoutes,
  children: [
    {
      path: "",
      Component: DashboardRoute,
      children: [...NotesRouter, ...ArchivedRouter],
    },
  ],
};

export default DashboardRouter;
