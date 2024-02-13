import "i18next";
import en from "@/languages/en";
import id from "@/languages/id";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "id";
    resources: {
      id: typeof id;
      en: typeof en;
    };
  }
}
