import { DashboardLayout, MobileLayout } from "../../layout";
import { Outlet } from "react-router-dom";
import ContentLayout from "../../layout/ContentLayout.tsx";

export default function DashboardRoute() {
  return (
    <DashboardLayout>
      <ContentLayout className={"max-xl:hidden"}>
        <Outlet />
      </ContentLayout>
      <MobileLayout className={"xl:hidden"}>
        <Outlet />
      </MobileLayout>
    </DashboardLayout>
  );
}
