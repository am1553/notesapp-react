import ProtectedRoutes from "../protected/ProtectedRoutes.tsx";
import DashboardRoute from "./DashboardRoute.tsx";
import NotesRoute from "./NotesRoute.tsx";
import NoteRoute from "./NoteRoute.tsx";

const DashboardRouter = {
  path: "/app",
  Component: ProtectedRoutes,
  children: [
    {
      path: "",
      Component: DashboardRoute,
      children: [
        {
          path: "notes",
          Component: NotesRoute,
        },
        {
          path: "notes/:noteID",
          Component: NoteRoute,
        },
      ],
    },
  ],
};

export default DashboardRouter;
