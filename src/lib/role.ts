import { ModulesType } from "@/lib/consts";
import { role_item_type } from "@/types/schema";

export function checkRole(
  roles: Array<{ module_key: string; permission: string }>,
  module: ModulesType | Array<ModulesType>,
  action: role_item_type,
  checkAll?: boolean
): boolean {
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
}
