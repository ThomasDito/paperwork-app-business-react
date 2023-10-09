import { ModulesType } from "@/lib/consts";
import { checkRole } from "@/lib/role";
import { useAppSelector } from "@/redux/hooks";
import { selectRoles } from "@/redux/slices/auth-slice";
import { role_item_type } from "@/types/schema";
import { useMemo } from "react";

export default function useRole(
  module: ModulesType | Array<ModulesType>,
  action: role_item_type,
  checkAll?: boolean
): boolean {
  const roles = useAppSelector(selectRoles);

  const check = useMemo(() => {
    return checkRole(roles, module, action, checkAll);
  }, [roles, module, action, checkAll]);

  return check;
}
