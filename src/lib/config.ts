const config = {
  ACCOUNT_URL:
    import.meta.env.VITE_ACCOUNT_URL || "https://account.paperwork.local",
  API_URL: import.meta.env.VITE_API_URL || "https://api.paperwork.local",
  BUSINESS_API_URL:
    import.meta.env.VITE_BUSINESS_API_URL ||
    "https://business-api.paperwork.local",
  LOGIN_URL: import.meta.env.VITE_LOGIN_URL || "https://sso.paperwork.local",
  SUBDOMAIN_URL: import.meta.env.VITE_SUBDOMAIN_URL || ".paperwork.local",
  DEBUG: {
    ORGANIZATION_ID: import.meta.env.VITE_DEBUG_ORGANIZATION_ID,
    AUTH_TOKEN: import.meta.env.VITE_DEBUG_AUTH_TOKEN,
  },
};

export default config;
