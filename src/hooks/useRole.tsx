import { ModulesType } from "@/lib/consts";
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

  const checkRole = () => {
    if (!Array.isArray(module)) {
      module = [module];
    }

    let passed = 0;
    module.forEach((item) => {
      const check = roles.find(
        (role) =>
          role.module_key === item &&
          (role.permission === action ||
            (role.permission === "write" && action === "read"))
      );

      if (check) passed++;
    });

    if (checkAll) {
      return passed === module.length;
    } else {
      return passed > 0;
    }
  };

  const check = useMemo(() => {
    return checkRole();
  }, [roles]);

  return check;
}
