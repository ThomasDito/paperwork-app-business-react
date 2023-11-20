import SidebarMenu from "@/components/partials/sidebar/menu";
import {
  businessSidebarMenus,
  memberSidebarMenus,
} from "@/consts/sidebar-menu";
import { useAppSelector } from "@/redux/hooks";
import { selectMember, selectRoles } from "@/redux/slices/auth-slice";
import { useMemo } from "react";

export default function GenerateSidebarMenu() {
  const member = useAppSelector(selectMember);
  const roles = useAppSelector(selectRoles);

  const sidebarMenus = useMemo(() => {
    let menus: SidebarMenuItem[] = [];

    if (roles.filter((role) => role.permission !== "no_access").length > 0) {
      menus = [...businessSidebarMenus];
    }

    if (member) {
      menus = [...menus, ...memberSidebarMenus];
    }

    return menus;
  }, [roles, member]);

  return <SidebarMenu menus={sidebarMenus} />;
}
