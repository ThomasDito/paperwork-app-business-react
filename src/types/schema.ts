export type user_gender = "male" | "female";
export type user_status = "active" | "inactive";
export type user_level = "user" | "superadmin";

export type user = {
  readonly id: string;
  user_email: string;
  user_password: string;
  user_fullname: string;
  user_address: string | null;
  user_gender: user_gender | null | string;
  user_level: user_level;
  user_phone: string | null;
  user_avatar: string | null;
  user_birthdate: Date | null;
  user_status: user_status | null;
  user_is_verified: boolean;
  user_verified_at: Date | string | null;
  readonly created_at: Date | string;
  readonly updated_at: Date | string;
};

export type user_organization_type = "founder" | "member";
export type user_organization_status = "waiting" | "accepted" | "declined";
export type user_organization = {
  readonly id: string;
  user_id: string;
  organization_id: string;
  user_organization_type: user_organization_type;
  user_organization_status: user_organization_status;
  readonly created_at: Date | string;
  readonly updated_at: Date | string;
};

export type region = {
  readonly id: string;
  region_name: string;
};

export type organization_type = "company" | "residence" | "school";
export type organization_status =
  | "active"
  | "in_review"
  | "inactive"
  | "revised"
  | "declined";

export type organization = {
  readonly id: string;
  organization_name: string;
  organization_domain: string | null;
  organization_nicename: string;
  organization_type: organization_type;
  organization_status: organization_status;
  organization_address_1: string;
  organization_address_2: string | null;
  organization_logo: string | null;
  organization_postal_code: string;
  city_id: string;
  province_id: string;
  founder_id: string;
  readonly created_at: Date | string;
  readonly updated_at: Date | string;
  province: region;
  city: region;
};

export type branch_status = "active" | "inactive";
export type branch = {
  readonly id: string;
  branch_name: string;
  branch_status: branch_status;
  organization_id: string;
  readonly created_at: Date | string;
  readonly updated_at: Date | string;
};

export type division_status = "active" | "inactive";
export type division = {
  readonly id: string;
  division_name: string;
  division_status: division_status;
  division_parent_id: string | null;
  organization_id: string;
  readonly created_at: Date | string;
  readonly updated_at: Date | string;
  _count: {
    children: number;
    employees: number;
  };
};

export type position_status = "active" | "inactive";
export type position = {
  readonly id: string;
  position_name: string;
  position_status: position_status;
  organization_id: string;
  readonly created_at: Date | string;
  readonly updated_at: Date | string;
};

export type level_status = "active" | "inactive";
export type level = {
  readonly id: string;
  level_name: string;
  level_status: level_status;
  organization_id: string;
  readonly created_at: Date | string;
  readonly updated_at: Date | string;
};

export type employee_status_status = "active" | "inactive";
export type employee_status = {
  readonly id: string;
  employee_status_name: string;
  employee_status_status: employee_status_status;
  organization_id: string;
  readonly created_at: Date | string;
  readonly updated_at: Date | string;
  _count: {
    employees: number;
  };
};

export type module = {
  readonly id: string;
  module_key: string;
  module_name: string;
  module_index: number;
  readonly created_at: Date | string;
  readonly updated_at: Date | string;
};

export type role_status = "active" | "inactive";
export type role = {
  readonly id: string;
  role_status: role_status;
  user_id: string;
  organization_id: string;
  readonly created_at: Date | string;
  readonly updated_at: Date | string;
};

export type role_item_type = "read" | "write" | "no_access";
export type role_item = {
  readonly id: string;
  role_id: string;
  role_item_type: role_item_type;
  module_id: string;
  readonly created_at: Date | string;
  readonly updated_at: Date | string;
};

export type information = {
  readonly id: string;
  organization_id: string;
  information_title: string;
  information_start_date: Date | string;
  information_end_date: Date | string;
  information_content: string;
  readonly created_at: Date | string;
  readonly updated_at: Date | string;
};

export type inventory = {
  readonly id: string;
  organization_id: string;
  employee_id?: string | null;
  inventory_name: string;
  inventory_number: string;
  inventory_buy_date: Date | string;
  inventory_start_date: Date | string | null;
  inventory_end_date: Date | string | null;
  readonly created_at: Date | string;
  readonly updated_at: Date | string;
};

export type event = {
  readonly id: string;
  organization_id: string;
  event_name: string;
  event_start_date: Date | string;
  event_end_date: Date | string;
  event_description: string;
  event_location: string;
  readonly created_at: Date | string;
  readonly updated_at: Date | string;
};

export type organization_application = {
  readonly id: string;
  organization_id: string;
  application_id: string;
  readonly created_at: Date | string;
  readonly updated_at: Date | string;
};

export type application_type = "all" | "company";
export type application_status = "active" | "inactive";

export type application = {
  readonly id: string;
  organization_id: string;
  application_type: application_type;
  aplication_status: application_status;
  application_name: string;
  application_description: string;
  application_path: string;
  application_image: string | null;
  readonly created_at: Date | string;
  readonly updated_at: Date | string;
  organization_applications: Array<organization_application>;
};
