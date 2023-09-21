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
        link: "/organization/organization-list",
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
    title: "Profil",
    icon: <LucideUser className="w-5 h-5" />,
    link: "/profile",
  },
];
