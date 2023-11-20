import {
  LucideBuilding,
  LucideFolderCog,
  LucideHome,
  LucideInfo,
  LucideLayoutPanelLeft,
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
    icon: <LucideBuilding className="w-5 h-5" />,
    moduleKey: ["role", "member"],
    children: [
      {
        title: "Anggota",
        link: "/business/organization/member",
        moduleKey: "member",
      },
      {
        title: "Hak Akses",
        link: "/business/organization/role",
        moduleKey: "role",
      },
      {
        title: "Pengaturan",
        link: "/business/organization/setting",
        moduleKey: ["organization_setting"],
      },
    ],
  },
  {
    title: "Aplikasi",
    icon: <LucideLayoutPanelLeft className="w-5 h-5" />,
    link: "/business/application",
    moduleKey: "member",
  },
  {
    title: "Pengelolaan",
    icon: <LucideFolderCog className="w-5 h-5" />,
    moduleKey: ["member"],
    children: [
      {
        title: "Kalender",
        link: "/business/manage/event",
        moduleKey: "event",
      },
      {
        title: "Pengumuman",
        link: "/business/manage/information",
        moduleKey: "information",
      },
    ],
  },
];

export const memberSidebarMenus: SidebarMenuItem[] = [
  {
    title: "pegawai",
    isHeader: true,
  },
  // {
  //   title: "Beranda",
  //   icon: <LucideHome className="w-5 h-5" />,
  //   link: "/member/dashboard",
  // },
  {
    title: "Informasi",
    icon: <LucideInfo className="w-5 h-5" />,
    children: [
      {
        title: "Kalender",
        link: "/member/information/event",
      },
      {
        title: "Pengumuman",
        link: "/member/information/information",
      },
      // {
      //   title: "Aktivitas",
      //   link: "/member/information/activity",
      // },
      // {
      //   title: "Bantuan dan Dukungan",
      //   link: "/member/information/help",
      // },
    ],
  },
];
