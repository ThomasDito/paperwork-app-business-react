import { ModulesType } from "@/lib/consts";
import { role_item_type } from "@/types/schema";

export function checkRole(
  roles: Array<{ module_key: string; permission: string }>,
  module: ModulesType,
  action: role_item_type
): boolean {
  //   if (checkAll) {
  //     return requiredPermissions.every((p) => currentPermissions.includes(p));
  // }

  // return requiredPermissions.some((p) => currentPermissions.includes(p));

  const check = roles.find((role) => {
    return (
      role.module_key === module &&
      (role.permission === action ||
        (role.permission === "write" && action === "read"))
    );
  });

  return check ? true : false;
}
