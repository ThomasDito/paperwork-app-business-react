import { SettingSidebar } from "@/pages/business/organization/setting/components/sidebar";
import { Outlet } from "react-router-dom";

export default function SettingIndex() {
  return (
    <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-8 lg:space-y-0">
      <aside className="lg:w-1/5">
        <SettingSidebar />
      </aside>
      <div className="flex-1 mx-auto w-full lg:max-w-4xl">
        <Outlet />
      </div>
    </div>
  );
}
