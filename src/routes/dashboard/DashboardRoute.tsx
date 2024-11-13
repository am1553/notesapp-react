import { DashboardLayout } from "../../layout";
import { Outlet } from "react-router-dom";
import SectionLayout from "../../layout/SectionLayout.tsx";

export default function DashboardRoute() {
  return (
    <DashboardLayout>
      <SectionLayout>
        <Outlet />
      </SectionLayout>
    </DashboardLayout>
  );
}
