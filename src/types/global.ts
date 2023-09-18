type PaginationMeta = {
  is_first_page: boolean;
  is_last_page: boolean;
  current_page: number;
  previous_page: number | null;
  next_page: number | null;
  page_count: number;
  total_count: number;
};

type PaginationParams<T> = {
  page?: number;
  limit?: number;
  search?: string;
  order_by?: keyof T;
  order_sort?: "asc" | "desc";
};

type CountMeta = {
  _count?: {
    [field: string]: number;
  };
};

type ApiResponse<T> = {
  success: boolean;
  message?: string | null;
  pagination?: PaginationMeta;
  data: T;
  errors: {
    [key: string]: string;
  }[];
};

type SidebarMenuItemChild = {
  title: string;
  link: string;
};

type SidebarMenuItem = {
  title: string;
  link?: string;
  icon?: JSX.Element;
  isHeader?: boolean;
  isOpen?: boolean;
  isHide?: boolean;
  children?: SidebarMenuItemChild[];
};
