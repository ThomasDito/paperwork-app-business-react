import useSidebar from "@/hooks/useSidebar";
import { cn } from "paperwork-ui";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "paperwork-ui";

export default function SidebarLogo({ menuHover }: { menuHover: boolean }) {
  const [collapsed, setMenuCollapsed] = useSidebar();

  return (
    <>
      <div className="relative h-auto px-4 my-6 space-y-4">
        <div className={cn("flex items-center justify-between", !menuHover && "overflow-hidden", !collapsed && "overflow-visible")}>
          <Link className={cn("flex items-center justify-start", !collapsed || menuHover ? "justify-start" : "flex-1")} to="/">
            <div className={cn("relative flex flex-nowrap h-12 overflow-hidden", !collapsed || menuHover ? "w-auto " : "w-12")}>
              {!collapsed || menuHover ? (
                <img src="/logo.png" alt="Paperwork" className="h-12 max-w-none" />
              ) : (
                <img src="/icon.png" alt="Paperwork" className="h-12 max-w-none" />
              )}
            </div>
          </Link>

          <div className={cn("absolute -right-4 z-100 transition-opacity duration-200", !menuHover && "opacity-0", !collapsed && "opacity-100")}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMenuCollapsed(!collapsed)}
              className={cn(
                "h-8 w-8 rounded-full bg-[#2B3674] hover:bg-[#2B3674] text-white hover:text-white ring-8 ring-background transition-translate duration-500"
              )}
            >
              <ChevronLeft className={cn("w-4 h-4 transition-transform duration-300 scale-x-100", collapsed && "scale-x-[-1]")} />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
