const config = {
  ACCOUNT_URL:
    import.meta.env.VITE_ACCOUNT_URL || "http://account.paperwork.local",
  API_URL: import.meta.env.VITE_API_URL || "http://sso.paperwork.local/api",
  LOGIN_URL: import.meta.env.VITE_LOGIN_URL || "http://sso.paperwork.local",
  SUBDOMAIN_URL: import.meta.env.VITE_SUBDOMAIN_URL || ".paperwork.local",
};

export default config;
