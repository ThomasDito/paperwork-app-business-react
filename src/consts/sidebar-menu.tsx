import {
  LucideDollarSign,
  LucideFolderCog,
  LucideHome,
  LucideLayoutGrid,
  LucideLayoutPanelLeft,
  LucideUser,
  LucideUsers,
} from "lucide-react";

export const sidebarMenus: SidebarMenuItem[] = [
  {
    title: "bisnis",
    isHeader: true,
  },
  {
    title: "Beranda",
    icon: <LucideHome className="w-5 h-5" />,
    link: "/dashboard",
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
    link: "/user",
  },
  {
    title: "Pengelolaan",
    icon: <LucideFolderCog className="w-5 h-5" />,
    link: "/transaction",
    children: [
      {
        title: "Kalender",
        link: "/transaction/invoice",
      },
      {
        title: "Informasi",
        link: "/transaction/payment",
      },
      {
        title: "Inventaris",
        link: "/transaction/1",
      },
      {
        title: "Landing Page",
        link: "/transaction/2",
      },
    ],
  },
  {
    title: "pekerja",
    isHeader: true,
  },
  {
    title: "Beranda",
    icon: <LucideUser className="w-5 h-5" />,
    link: "/account/dashboard",
  },
  {
    title: "Informasi",
    icon: <LucideFolderCog className="w-5 h-5" />,
    link: "/account/information",
    children: [
      {
        title: "Kalender",
        link: "/account/information/1",
      },
      {
        title: "Pengumuman",
        link: "/account/information/2",
      },
      {
        title: "Aktivitas",
        link: "/account/information/3",
      },
      {
        title: "Bantuan dan Dukungan",
        link: "/account/information/4",
      },
    ],
  },
];
