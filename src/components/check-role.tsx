import { ModulesType } from "@/lib/consts";
import { checkRole } from "@/lib/role";
import { useAppSelector } from "@/redux/hooks";
import { selectRoles } from "@/redux/slices/auth-slice";
import { role_item_type } from "@/types/schema";
import { PropsWithChildren } from "react";

type Props = {
  module: ModulesType;
  action: role_item_type;
  failed?: JSX.Element | null;
};

export default function CheckRole({
  module,
  action,
  failed,
  children,
}: PropsWithChildren<Props>) {
  const roles = useAppSelector(selectRoles);
  const check = checkRole(roles, module, action);

  if (!check) {
    return failed;
  } else {
    return children;
  }
}
