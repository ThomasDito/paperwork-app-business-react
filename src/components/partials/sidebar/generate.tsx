import SidebarMenu from "@/components/partials/sidebar/menu";
import {
  businessSidebarMenus,
  memberSidebarMenus,
} from "@/consts/sidebar-menu";
import { useAppSelector } from "@/redux/hooks";
import { selectMe, selectRoles } from "@/redux/slices/auth-slice";
import { useMemo } from "react";

export default function GenerateSidebarMenu() {
  const me = useAppSelector(selectMe);
  const roles = useAppSelector(selectRoles);

  const sidebarMenus = useMemo(() => {
    let menus: SidebarMenuItem[] = [];

    if (roles.filter((role) => role.permission !== "no_access").length > 0) {
      menus = [...businessSidebarMenus];
    }

    if (me) {
      menus = [...memberSidebarMenus, ...menus];
    }

    return menus;
  }, [roles, me]);

  return <SidebarMenu menus={sidebarMenus} />;
}
