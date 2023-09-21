type user_gender = "male" | "female";
type user_status = "active" | "inactive";
type user_level = "user" | "superadmin";

type user = {
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

type region = {
  readonly id: string;
  region_name: string;
};

type organization_type = "company" | "residence" | "school";
type organization_status =
  | "active"
  | "in_review"
  | "inactive"
  | "revised"
  | "declined";

type organization = {
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

type branch_status = "active" | "inactive";
type branch = {
  readonly id: string;
  branch_name: string;
  branch_status: branch_status;
  organization_id: string;
  readonly created_at: Date | string;
  readonly updated_at: Date | string;
};

type division_status = "active" | "inactive";
type division = {
  readonly id: string;
  division_name: string;
  division_status: division_status;
  division_parent_id: string | null;
  organization_id: string;
  readonly created_at: Date | string;
  readonly updated_at: Date | string;
};

type position_status = "active" | "inactive";
type position = {
  readonly id: string;
  position_name: string;
  position_status: position_status;
  organization_id: string;
  readonly created_at: Date | string;
  readonly updated_at: Date | string;
};

type level_status = "active" | "inactive";
type level = {
  readonly id: string;
  level_name: string;
  level_status: level_status;
  organization_id: string;
  readonly created_at: Date | string;
  readonly updated_at: Date | string;
};

type employee_status_status = "active" | "inactive";
type employee_status = {
  readonly id: string;
  employee_status_name: string;
  employee_status_status: employee_status_status;
  organization_id: string;
  readonly created_at: Date | string;
  readonly updated_at: Date | string;
};
