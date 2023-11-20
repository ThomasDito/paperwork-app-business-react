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
  "member",
  "organization_setting",
  "role",
  "information",
] as const;

export type ModulesType = (typeof MODULES)[number];
