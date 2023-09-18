import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { handleSidebarCollapses } from "@/redux/slices/layout-slice";

export default function useSidebar(): [boolean, (value: boolean) => void] {
  const dispatch = useAppDispatch();
  const collapsed = useAppSelector((state) => state.layout.sidebarIsCollapsed);

  const setMenuCollapsed = (value: boolean): void => {
    dispatch(handleSidebarCollapses(value));
    return;
  };

  return [collapsed, setMenuCollapsed];
}
