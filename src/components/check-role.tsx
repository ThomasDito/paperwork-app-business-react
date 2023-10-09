import RestrictedPage from "@/components/restricted-page";
import useRole from "@/hooks/useRole";
import { ModulesType } from "@/lib/consts";
import { role_item_type } from "@/types/schema";
import { PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";

type Props = {
  module: ModulesType | Array<ModulesType>;
  action?: role_item_type;
  failed?: JSX.Element | null;
  checkAll?: boolean;
};

export function CheckRole({
  module,
  action = "read",
  failed,
  checkAll,
  children,
}: PropsWithChildren<Props>) {
  const check = useRole(module, action, checkAll);

  if (!check) {
    return failed;
  } else {
    return children;
  }
}

export function CheckRoleOutlet({
  module,
  action = "read",
  checkAll,
}: Omit<Props, "failed">) {
  const check = useRole(module, action, checkAll);

  if (!check) {
    return <RestrictedPage />;
  } else {
    return <Outlet />;
  }
}
