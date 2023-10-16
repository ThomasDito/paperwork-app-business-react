export const user_gender = {
  male: "male",
  female: "female",
};

export const user_level = {
  superadmin: "superadmin",
  user: "user",
};

export const user_status = {
  active: "active",
  inactive: "inactive",
};

export const REGEX = {
  PHONE: "^(^\\+62|62|^02|^03|^04|^05|^06|^07|^08|^09)(\\d{3,4}-?){2}\\d{3,4}$",
  ALPHABET_ONLY: "^[a-z]+$",
  YEAR: "^\\d{4}$",
} as const;

export const MODULES = [
  "employee",
  "organization_setting",
  "branch",
  "division",
  "position",
  "level",
  "employee_status",
  "role",
  "information",
] as const;

export type ModulesType = (typeof MODULES)[number];

export const EMPLOYEE_GENDERS = ["male", "female"] as const;

export const EMPLOYEE_MARITAL_STATUSES = [
  "married",
  "single",
  "divorced",
] as const;

export const EMPLOYEE_RELIGIONS = [
  "buddha",
  "catholic",
  "christian",
  "hindu",
  "islam",
  "konghucu",
] as const;

export const EMPLOYEE_EDUCATION_LEVELS = [
  "SD",
  "SMP",
  "SMA",
  "D1",
  "D2",
  "D3",
  "D4",
  "S1",
  "S2",
  "S3",
] as const;
