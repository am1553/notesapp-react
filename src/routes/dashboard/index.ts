import ProtectedRoutes from "../protected/ProtectedRoutes.tsx";
import DashboardRoute from "./DashboardRoute.tsx";
import NotesRoute from "./NotesRoute.tsx";
import NoteRoute from "./NoteRoute.tsx";
import ArchivedRoute from "./ArchivedRoute.tsx";

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
    path: "archived",
    Component: ArchivedRoute,
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
