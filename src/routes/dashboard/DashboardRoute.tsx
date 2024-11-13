import { DashboardLayout, MobileLayout, ContentLayout } from "../../layout";
import { Outlet } from "react-router-dom";
import { ActionBar, ContentSidebar } from "../../components";

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
