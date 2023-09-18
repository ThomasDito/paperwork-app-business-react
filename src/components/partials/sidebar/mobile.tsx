import SidebarMenu from "@/components/partials/sidebar/menu";
import { SheetContent, ScrollArea } from "paperwork-ui";
import { sidebarMenus } from "@/consts/sidebar-menu";

export default function MobileSidebar() {
  return (
    <SheetContent side="left" className="sm:rounded-none shadow-none !w-[var(--auth-sidebar-width)] p-0 bg-card" id="mobile-sidebar">
      <div className="p-4 pb-5">
        <img src="/logo.png" alt="Paperwork" className="h-12 max-w-none" />
      </div>
      <ScrollArea className="h-[calc(100%-80px)] pb-8">
        <SidebarMenu menus={sidebarMenus} />
      </ScrollArea>
    </SheetContent>
  );
}
