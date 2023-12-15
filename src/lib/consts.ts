export const user_gender = {
  male: "male",
  female: "female",
} as const;

export const user_level = {
  superadmin: "superadmin",
  user: "user",
} as const;

export const user_status = {
  active: "active",
  inactive: "inactive",
} as const;

export const REGEX = {
  PHONE: "^(^\\+62|62|^02|^03|^04|^05|^06|^07|^08|^09)(\\d{3,4}-?){2}\\d{3,4}$",
  ALPHABET_ONLY: "^[a-z]+$",
  YEAR: "^\\d{4}$",
} as const;

export const MODULES = [
  "member",
  "organization_setting",
  "role",
  "event",
  "information",
] as const;

export type ModulesType = (typeof MODULES)[number];
