import {
  EMPLOYEE_EDUCATION_LEVELS,
  EMPLOYEE_GENDERS,
  EMPLOYEE_MARITAL_STATUSES,
  EMPLOYEE_RELIGIONS,
} from "@/lib/consts";

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
};

export type employee_gender = (typeof EMPLOYEE_GENDERS)[number];
export type employee_marital_status =
  (typeof EMPLOYEE_MARITAL_STATUSES)[number];
export type employee_religion = (typeof EMPLOYEE_RELIGIONS)[number];
export type employee_education_level =
  (typeof EMPLOYEE_EDUCATION_LEVELS)[number];

export type employee = {
  readonly id: string;
  employee_id: string;
  employee_name: string;
  employee_profile_picture: string | null;
  employee_email: string;
  employee_phone: string;
  employee_telephone: string | null;
  employee_birth_place: string;
  employee_birth_date: Date | string;
  employee_gender: employee_gender;
  employee_marital_status: employee_marital_status;
  employee_religion: employee_religion;
  employee_ktp_number: string;
  employee_ktp_address: string;
  employee_domicile_address: string;
  employee_close_family_name: string;
  employee_close_family_phone: string;
  employee_education_level: employee_education_level;
  employee_education_name: string;
  employee_education_graduate: number;
  employee_education_score: number;
  employee_previous_job_position: string | null;
  employee_previous_job_division: string | null;
  employee_previous_job_office_name: string | null;
  employee_previous_job_office_phone: string | null;
  employee_previous_job_office_address: string | null;
  employee_previous_job_start_date: Date | string | null;
  employee_previous_job_end_date: Date | string | null;
  employee_join_date: Date | string;
  employee_contract_start_date: Date | string;
  employee_contract_end_date: Date | string;
  employee_bpjs_kesehatan_number: string | null;
  employee_bpjs_ketenagakerjaan_number: string | null;
  employee_email_office: string | null;
  user_id: string;
  organization_id: string;
  branch_id: string;
  division_id: string;
  position_id: string;
  level_id: string;
  employee_status_id: string;
  readonly created_at: Date | string;
  readonly updated_at: Date | string;
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
  position_id: string;
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
