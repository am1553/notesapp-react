import { Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "../../Loading.tsx";
import DashboardLayout from "../../../layout/DashboardLayout.tsx";
import ContentLayout from "../../../layout/ContentLayout.tsx";
import MobileLayout from "../../../layout/MobileLayout.tsx";

const ActionBar = lazy(() => import("../../../components/ActionBar.tsx"));
const ContentSidebar = lazy(
  () => import("../../../components/ContentSidebar.tsx"),
);

export default function DashboardRoute() {
  return (
    <DashboardLayout>
      <ContentLayout className={"max-xl:hidden"}>
        <Suspense fallback={<Loading />}>
          <ContentSidebar />
        </Suspense>
        <Outlet />
        <Suspense fallback={<Loading />}>
          <ActionBar />
        </Suspense>
      </ContentLayout>
      <MobileLayout className={"xl:hidden"}>
        <Outlet />
      </MobileLayout>
    </DashboardLayout>
  );
}
