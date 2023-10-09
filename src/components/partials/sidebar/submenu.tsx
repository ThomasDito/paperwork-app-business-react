import { NavLink } from "react-router-dom";
import { cn } from "paperwork-ui";
import { Collapse } from "react-collapse";
import { checkRole } from "@/lib/role";
import { useAppSelector } from "@/redux/hooks";
import { selectRoles } from "@/redux/slices/auth-slice";
import { useCallback } from "react";
import { ModulesType } from "@/lib/consts";

export default function SidebarSubmenu({
  activeSubmenu,
  item,
  i,
}: {
  activeSubmenu: number | null;
  item: SidebarMenuItem;
  i: number;
}) {
  const roles = useAppSelector(selectRoles);

  const checkPermission = useCallback(
    (moduleKey: ModulesType | Array<ModulesType>) => {
      return checkRole(roles, moduleKey, "read");
    },
    [roles]
  );

  return (
    <Collapse isOpened={activeSubmenu === i}>
      <ul className="menu-sub">
        {item.children &&
          item.children
            .filter((subItem) => {
              if (!subItem.moduleKey) return true;
              return checkPermission(
                subItem.moduleKey as ModulesType | Array<ModulesType>
              );
            })
            .map((subItem, j) => (
              <li key={j} className="menu-item">
                <NavLink to={subItem.link} className={"menu-link"}>
                  {({ isActive }) => (
                    <>
                      <div className="inline-flex items-center justify-center w-5 h-5 mr-2">
                        <span
                          className={cn(
                            "h-2 w-2 rounded-full border border-primary/80  flex-none inline-flex items-center justify-center",
                            isActive &&
                              "bg-primary/80 ring-4 ring-opacity-[15%] ring-primary/10"
                          )}
                        ></span>
                      </div>
                      <span className="menu-text">{subItem.title}</span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
      </ul>
    </Collapse>
  );
}
