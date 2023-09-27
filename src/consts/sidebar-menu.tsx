import {
  LucideFolderCog,
  LucideHome,
  LucideLayoutGrid,
  LucideLayoutPanelLeft,
  LucideUser,
} from "lucide-react";

export const sidebarMenus: SidebarMenuItem[] = [
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
    children: [
      {
        title: "Anggota",
        link: "/business/organization/employee",
      },
      {
        title: "Hak Akses",
        link: "/business/organization/role",
      },
      {
        title: "Pengaturan",
        link: "/business/organization/setting",
      },
    ],
  },
  {
    title: "Aplikasi",
    icon: <LucideLayoutPanelLeft className="w-5 h-5" />,
    link: "/business/application",
  },
  {
    title: "Pengelolaan",
    icon: <LucideFolderCog className="w-5 h-5" />,
    children: [
      {
        title: "Kalender",
        link: "/business/manage/event",
      },
      {
        title: "Informasi",
        link: "/business/manage/information",
      },
      {
        title: "Inventaris",
        link: "/business/manage/inventory",
      },
      {
        title: "Landing Page",
        link: "/business/manage/landing-page",
      },
    ],
  },
  {
    title: "pegawai",
    isHeader: true,
  },
  {
    title: "Beranda",
    icon: <LucideUser className="w-5 h-5" />,
    link: "/user/dashboard",
  },
  {
    title: "Informasi",
    icon: <LucideFolderCog className="w-5 h-5" />,
    children: [
      {
        title: "Kalender",
        link: "/user/information/event",
      },
      {
        title: "Pengumuman",
        link: "/user/information/information",
      },
      {
        title: "Aktivitas",
        link: "/user/information/activity",
      },
      {
        title: "Bantuan dan Dukungan",
        link: "/user/information/help",
      },
    ],
  },
];
