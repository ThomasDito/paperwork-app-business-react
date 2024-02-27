import SidebarSubmenu from "@/components/partials/sidebar/submenu";
import { cn } from "paperwork-ui";
import { LucideChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import { ModulesType } from "@/lib/consts";
import { checkRole } from "@/lib/role";
import { selectRoles } from "@/redux/slices/auth-slice";

export default function SidebarMenu({ menus }: { menus: SidebarMenuItem[] }) {
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);

  const toggleSubmenu = (i: number) => {
    if (activeSubmenu === i) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(i);
    }
  };

  const location = useLocation();
  const locationName = location.pathname;

  useEffect(() => {
    let submenuIndex = null;
    menus.map((item, i) => {
      if (!item.children) return;
      if (item.link === locationName) {
        submenuIndex = null;
      } else {
        const childIndex = item.children.findIndex(
          (ci) => ci.link === locationName || locationName.includes(ci.link)
        );

        if (childIndex !== -1) {
          submenuIndex = i;
        }
      }
    });

    setActiveSubmenu(submenuIndex);
  }, [location]);

  // Permissions
  const roles = useAppSelector(selectRoles);
  const checkPermission = useCallback(
    (moduleKey: ModulesType | Array<ModulesType>) => {
      return checkRole(roles, moduleKey, "read");
    },
    [roles]
  );

  return (
    <>
      <ul className="space-y-1">
        {menus.map((item, i) => (
          <li
            key={i}
            className={cn(
              "menu-item first:z-20",
              (locationName === item.link ||
                locationName.includes(item.link!)) &&
                "before:bg-warning-200"
            )}
          >
            {/* Menu item is header */}
            {item.isHeader && !item.children && (
              <div
                className={cn(
                  "my-2 text-xs font-semibold uppercase menu-header",
                  i > 0 && "mt-6"
                )}
              >
                <div className="menu-header-text">{item.title}</div>
              </div>
            )}

            {/* Menu item without children */}
            {!item.children &&
              !item.isHeader &&
              item.link &&
              (!item.moduleKey ||
                checkPermission(
                  item.moduleKey as ModulesType | Array<ModulesType>
                )) && (
                <NavLink
                  to={item.link}
                  className={cn(
                    "menu-link",
                    (locationName === item.link ||
                      locationName.includes(item.link!)) &&
                      "text-primary"
                  )}
                >
                  <span className="inline-flex items-center justify-center mr-2">
                    {item.icon}
                  </span>
                  <div className={cn("menu-text")}>{item.title}</div>
                </NavLink>
              )}

            {/* Menu item with children */}
            {item.children &&
              (!item.moduleKey ||
                checkPermission(
                  item.moduleKey as ModulesType | Array<ModulesType>
                )) && (
                <div
                  className={cn(
                    "menu-link select-none",
                    activeSubmenu === i && "",
                    (locationName === item.link ||
                      locationName.includes(item.link!)) &&
                      "text-primary"
                  )}
                  onClick={() => toggleSubmenu(i)}
                >
                  <div
                    className={cn("flex items-center flex-1 cursor-pointer")}
                  >
                    <div className="flex items-center flex-1">
                      <span className="inline-flex items-center justify-center mr-2">
                        {item.icon}
                      </span>
                      <div className="menu-text">{item.title}</div>
                    </div>
                    <div className="flex-nowrap">
                      <div
                        className={cn(
                          "transition-transform duration-300 rounded-full",
                          activeSubmenu === i && "rotate-90"
                        )}
                      >
                        <LucideChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

            <SidebarSubmenu activeSubmenu={activeSubmenu} item={item} i={i} />
          </li>
        ))}
      </ul>
    </>
  );
}
