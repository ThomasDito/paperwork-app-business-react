import { Outlet } from "react-router-dom";
import Sidebar from "@/components/partials/sidebar";
import useSidebar from "@/hooks/useSidebar";
import { Header } from "@/components/partials/header";
import MobileSidebar from "@/components/partials/sidebar/mobile";
import { Navbar } from "@/components/partials/navbar";
import { Sheet, cn } from "paperwork-ui";

export default function PageLayout() {
  const [collapsed] = useSidebar();

  return (
    <Sheet>
      <div className="flex flex-row flex-1 min-h-screen">
        <Sidebar />
        <main
          className={cn(
            "flex-1 w-full overflow-x-auto",
            collapsed ? "lg:ml-[80px]" : "lg:ml-[var(--auth-sidebar-width)]"
          )}
        >
          <Header className={cn(!collapsed && "md:px-8")} />
          <Navbar />
          <section
            className={cn(
              "container flex-1 w-full py-12 mx-auto",
              !collapsed && "md:px-8"
            )}
          >
            <MobileSidebar />
            <Outlet />
          </section>
        </main>
      </div>
    </Sheet>
  );
}
