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
};

type organization_pic = {
  readonly id: string;
  organization_pic_name: string;
  organization_pic_phone: string;
  organization_pic_ktp: string;
  readonly created_at: Date | string;
  readonly updated_at: Date | string;
};

type organization_review_status = "accepted" | "revised" | "declined";

type organization_review = {
  readonly id: string;
  organization_review_message: string;
  organization_review_status: organization_review_status;
  organization_id: string;
  readonly created_at: Date | string;
  readonly updated_at: Date | string;
};

type user_organization_type = "founder" | "member";

type user_organization = {
  readonly id: string;
  user_id: string;
  organization_id: string;
  user_organization_type: user_organization_type;
  readonly created_at: Date | string;
  readonly updated_at: Date | string;
};

type user_session_device = "desktop" | "mobile" | "bot" | "unknown";

type user_session = {
  readonly id: string;
  user_id: string;
  user_session_access_token: string | null;
  user_session_device: user_session_device | "unknown" | null;
  user_session_browser: string | "unknown" | null;
  user_session_browser_version: string | "unknown" | null;
  user_session_os: string | "unknown" | null;
  user_session_platform: string | "unknown" | null;
  user_session_source: string | "unknown" | null;
  user_session_ip_address: string | null;
  organization_id: string | null;
  readonly expired_at: Date | string | null;
  readonly created_at: Date | string;
  readonly updated_at: Date | string;
  organization?: organization | null;
};
