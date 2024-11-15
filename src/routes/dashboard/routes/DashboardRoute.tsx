import { Outlet } from "react-router-dom";
import DashboardLayout from "../../../layout/DashboardLayout.tsx";
import ContentLayout from "../../../layout/ContentLayout.tsx";
import MobileLayout from "../../../layout/MobileLayout.tsx";
import ContentSidebar from "../../../components/ContentSidebar.tsx";
import ActionBar from "../../../components/ActionBar.tsx";

export default function DashboardRoute() {
  return (
    <DashboardLayout>
      <ContentLayout className={"max-xl:hidden"}>
        <ContentSidebar />
        <Outlet />
        <ActionBar />
      </ContentLayout>
      <MobileLayout className={"xl:hidden"}>
        <Outlet />
      </MobileLayout>
    </DashboardLayout>
  );
}
