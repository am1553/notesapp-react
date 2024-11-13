import { DashboardLayout } from "../../layout";
import { Outlet } from "react-router-dom";
import ContentLayout from "../../layout/ContentLayout.tsx";

export default function DashboardRoute() {
  return (
    <DashboardLayout>
      <ContentLayout>
        <Outlet />
      </ContentLayout>
    </DashboardLayout>
  );
}
