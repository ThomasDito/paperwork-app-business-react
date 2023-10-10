import {
  LucideFolderCog,
  LucideHome,
  LucideLayoutGrid,
  LucideLayoutPanelLeft,
  LucideUser,
} from "lucide-react";

export const businessSidebarMenus: SidebarMenuItem[] = [
  {
    title: "bisnis",
    isHeader: true,
  },
  {
    title: "Beranda",
    icon: <LucideHome className="w-5 h-5" />,
    link: "/business/dashboard",
  },
  {
    title: "Organisasi",
    icon: <LucideLayoutGrid className="w-5 h-5" />,
    moduleKey: [
      "employee",
      "role",
      "branch",
      "division",
      "position",
      "level",
      "employee_status",
    ],
    children: [
      {
        title: "Anggota",
        link: "/business/organization/employee",
        moduleKey: "employee",
      },
      {
        title: "Hak Akses",
        link: "/business/organization/role",
        moduleKey: "role",
      },
      {
        title: "Pengaturan",
        link: "/business/organization/setting",
        moduleKey: [
          "organization_setting",
          "branch",
          "division",
          "position",
          "level",
          "employee_status",
        ],
      },
    ],
  },
  {
    title: "Aplikasi",
    icon: <LucideLayoutPanelLeft className="w-5 h-5" />,
    link: "/business/application",
    moduleKey: "employee",
  },
  {
    title: "Pengelolaan",
    icon: <LucideFolderCog className="w-5 h-5" />,
    moduleKey: ["employee"],
    children: [
      {
        title: "Kalender",
        link: "/business/manage/event",
        moduleKey: "employee",
      },
      {
        title: "Informasi",
        link: "/business/manage/information",
        moduleKey: "role",
      },
      {
        title: "Inventaris",
        link: "/business/manage/inventory",
        moduleKey: "employee",
      },
      // {
      //   title: "Landing Page",
      //   link: "/business/manage/landing-page",
      // },
    ],
  },
];

export const employeeSidebarMenus: SidebarMenuItem[] = [
  {
    title: "pegawai",
    isHeader: true,
  },
  {
    title: "Beranda",
    icon: <LucideUser className="w-5 h-5" />,
    link: "/employee/dashboard",
  },
  {
    title: "Informasi",
    icon: <LucideFolderCog className="w-5 h-5" />,
    children: [
      {
        title: "Kalender",
        link: "/employee/information/event",
      },
      {
        title: "Pengumuman",
        link: "/employee/information/information",
      },
      {
        title: "Aktivitas",
        link: "/employee/information/activity",
      },
      {
        title: "Bantuan dan Dukungan",
        link: "/employee/information/help",
      },
    ],
  },
];
