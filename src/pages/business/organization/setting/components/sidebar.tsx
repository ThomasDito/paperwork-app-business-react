import { ModulesType } from "@/lib/consts";
import { checkRole } from "@/lib/role";
import { useAppSelector } from "@/redux/hooks";
import { selectRoles } from "@/redux/slices/auth-slice";
import { LucideBuilding } from "lucide-react";
import { buttonVariants, cn } from "paperwork-ui";
import { NavLink } from "react-router-dom";

export function SettingSidebar(): JSX.Element {
  const roles = useAppSelector(selectRoles);

  return (
    <nav
      className={cn(
        "flex overflow-x-auto pb-5 lg:pb-0 lg:overflow-hidden space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1.5"
      )}
    >
      {sidebarNavItems
        .filter((item) => checkRole(roles, item.moduleKey, "read"))
        .map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cn(
                buttonVariants({ variant: "ghost", size: "md" }),
                isActive
                  ? "bg-secondary hover:bg-secondary text-background hover:text-background"
                  : "hover:bg-secondary/5",
                "flex justify-start items-center text-sm px-4 py-2.5"
              )
            }
          >
            {item.icon} {item.title}
          </NavLink>
        ))}
    </nav>
  );
}

const sidebarNavItems: Array<{
  title: string;
  href: string;
  icon: JSX.Element;
  moduleKey: ModulesType;
}> = [
  {
    title: "Organisasi",
    href: "/business/organization/setting/organization",
    icon: <LucideBuilding className="w-5 h-5 mr-3" />,
    moduleKey: "organization_setting",
  },
];
