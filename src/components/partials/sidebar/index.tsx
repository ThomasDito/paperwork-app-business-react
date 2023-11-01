import SidebarLogo from "@/components/partials/sidebar/logo";
import { ScrollArea, cn } from "paperwork-ui";
import useSidebar from "@/hooks/useSidebar";
import { useState } from "react";
import { LogOut } from "lucide-react";
import { useLogoutMutation } from "@/redux/api/paperwork/auth-api";
import { toastError } from "@/components/ui/toast";
import GenerateSidebarMenu from "@/components/partials/sidebar/generate";

export default function Sidebar() {
  const [collapsed] = useSidebar();
  const [menuHover, setMenuHover] = useState<boolean>(false);

  const [logout] = useLogoutMutation();

  const doLogout = async () => {
    await logout()
      .unwrap()
      .then(
        () => {
          window.location.assign("/");
        },
        (rejected: { status: number; data?: ApiResponse<null> }) => {
          toastError(
            rejected.data?.message ||
              "Terjadi kesalahan ketika melakukan logout"
          );
        }
      );
  };

  return (
    <aside className="hidden lg:block">
      <div
        className={cn(
          "sidebar-wrapper fixed top-0 h-screen z-40 bg-card shadow flex flex-col",
          collapsed ? "w-20 close_sidebar" : "w-[var(--auth-sidebar-width)]",
          menuHover && "sidebar-hovered"
        )}
        onMouseEnter={() => {
          setMenuHover(true);
        }}
        onMouseLeave={() => {
          setMenuHover(false);
        }}
      >
        <SidebarLogo menuHover={menuHover} />

        <ScrollArea className="h-[calc(100%-80px)] relative">
          <div className="absolute z-10 w-full h-8 pointer-events-none bg-gradient-to-t from-transparent to-white" />
          <GenerateSidebarMenu />
        </ScrollArea>
        <div className={cn("menu-item py-4")}>
          <div
            className={cn(
              "menu-link bg-secondary text-secondary-foreground hover:bg-none select-none cursor-pointer"
            )}
            onClick={doLogout}
          >
            <span className="inline-flex items-center justify-center mr-2">
              <LogOut className="w-5 h-5" />
            </span>
            <div className={cn("menu-text")}>Logout</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
