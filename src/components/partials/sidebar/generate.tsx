import SidebarMenu from "@/components/partials/sidebar/menu";
import {
  businessSidebarMenus,
  employeeSidebarMenus,
} from "@/consts/sidebar-menu";
import { useAppSelector } from "@/redux/hooks";
import { selectEmployee, selectRoles } from "@/redux/slices/auth-slice";
import { useMemo } from "react";

export default function GenerateSidebarMenu() {
  const employee = useAppSelector(selectEmployee);
  const roles = useAppSelector(selectRoles);

  const sidebarMenus = useMemo(() => {
    let menus: SidebarMenuItem[] = [];

    if (roles.filter((role) => role.permission !== "no_access").length > 0) {
      menus = [...businessSidebarMenus];
    }

    if (employee) {
      menus = [...menus, ...employeeSidebarMenus];
    }

    return menus;
  }, [roles, employee]);

  return <SidebarMenu menus={sidebarMenus} />;
}
