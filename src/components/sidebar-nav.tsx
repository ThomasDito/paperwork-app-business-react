import { History, Home, Key, LayoutGrid, User2, Users } from "lucide-react"
import { NavLink } from "react-router-dom"
import { MainNav } from "./main-nav"
import { ScrollArea, buttonVariants } from "paperwork-ui";

export function SidebarNav() {
  return (
    <ScrollArea className="flex flex-col flex-grow p-4 pt-0 border-r border-gray-200">
      <div className="min-h-[var(--auth-header-height)] flex items-center px-4 mb-4">
        <MainNav />
      </div>
      <div className="space-y-2">
        {sidebarNavItems.map((item, index) => (
          <div key={index} className="w-full">
            <NavLink
              to={item.href}
              className={({ isActive }) => buttonVariants({ variant: isActive ? "secondary" : "ghost", className: "w-full !justify-start" })}
            >
              <div className="scale-125">{item.icon}</div>
              {item.title}
            </NavLink>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

export const sidebarNavItems = [
  {
    title: "Dasbor",
    href: "/",
    icon: <Home className="w-4 h-4 mr-3" />,
  },
  {
    title: "Users",
    href: "/users",
    icon: <Users className="w-4 h-4 mr-3" />,
  },
  {
    title: "Profil",
    href: "/profile",
    icon: <User2 className="w-4 h-4 mr-3" />,
  },
  {
    title: "Keamanan",
    href: "/security",
    icon: <Key className="w-4 h-4 mr-3" />,
  },
  {
    title: "Aplikasi",
    href: "/application",
    icon: <LayoutGrid className="w-4 h-4 mr-3" />,
  },
  {
    title: "Riwayat",
    href: "/history",
    icon: <History className="w-4 h-4 mr-3" />,
  },
]
