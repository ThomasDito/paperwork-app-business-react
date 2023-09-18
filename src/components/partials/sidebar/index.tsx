import SidebarLogo from "@/components/partials/sidebar/logo";
import SidebarMenu from "@/components/partials/sidebar/menu";
import { ScrollArea, cn } from "paperwork-ui";
import { sidebarMenus } from "@/consts/sidebar-menu";
import useSidebar from "@/hooks/useSidebar";
import { useState } from "react";
import { LogOut } from "lucide-react";

export default function Sidebar() {
  const [collapsed] = useSidebar();
  const [menuHover, setMenuHover] = useState<boolean>(false);

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
          <SidebarMenu menus={sidebarMenus} />
        </ScrollArea>
        <div className={cn("menu-item py-4")}>
          <div className={cn("menu-link bg-secondary text-secondary-foreground hover:bg-none select-none cursor-pointer")}>
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
