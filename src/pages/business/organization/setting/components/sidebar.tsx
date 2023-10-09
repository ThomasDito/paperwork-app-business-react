import { ModulesType } from "@/lib/consts";
import { checkRole } from "@/lib/role";
import { useAppSelector } from "@/redux/hooks";
import { selectRoles } from "@/redux/slices/auth-slice";
import {
  LucideFileClock,
  LucideHardHat,
  LucideLayoutGrid,
  LucideNetwork,
  LucideWarehouse,
  LucideWorkflow,
} from "lucide-react";
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
    icon: <LucideLayoutGrid className="w-5 h-5 mr-3" />,
    moduleKey: "organization_setting",
  },
  {
    title: "Cabang",
    href: "/business/organization/setting/branch",
    icon: <LucideWarehouse className="w-5 h-5 mr-3 mb-0.5" />,
    moduleKey: "branch",
  },
  {
    title: "Divisi",
    href: "/business/organization/setting/division",
    icon: <LucideNetwork className="w-5 h-5 mr-3" />,
    moduleKey: "division",
  },
  {
    title: "Jabatan",
    href: "/business/organization/setting/position",
    icon: <LucideHardHat className="w-5 h-5 mr-3" />,
    moduleKey: "position",
  },
  {
    title: "Level",
    href: "/business/organization/setting/level",
    icon: <LucideWorkflow className="w-5 h-5 mr-3" />,
    moduleKey: "level",
  },
  {
    title: "Status Kepegawaian",
    href: "/business/organization/setting/employee-status",
    icon: <LucideFileClock className="flex-shrink-0 w-5 h-5 mr-3" />,
    moduleKey: "employee_status",
  },
];
