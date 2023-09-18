import {
  LucideDollarSign,
  LucideHome,
  LucideLayoutGrid,
  LucideUser,
  LucideUsers,
} from "lucide-react";

export const sidebarMenus: SidebarMenuItem[] = [
  {
    title: "menu",
    isHeader: true,
  },
  {
    title: "Dashboard",
    icon: <LucideHome className="w-5 h-5" />,
    link: "/dashboard",
  },
  {
    title: "Organisasi",
    icon: <LucideLayoutGrid className="w-5 h-5" />,
    link: "/organization",
    children: [
      {
        title: "Daftar Organisasi",
        link: "/organization/organization-list",
      },
      {
        title: "Form Pengajuan",
        link: "/organization/submission",
      },
    ],
  },
  {
    title: "Pengguna",
    icon: <LucideUsers className="w-5 h-5" />,
    link: "/user",
  },
  {
    title: "Transaksi",
    icon: <LucideDollarSign className="w-5 h-5" />,
    link: "/transaction",
    children: [
      {
        title: "Penagihan",
        link: "/transaction/invoice",
      },
      {
        title: "Pembayaran",
        link: "/transaction/payment",
      },
    ],
  },
  {
    title: "akun",
    isHeader: true,
  },
  {
    title: "Profil",
    icon: <LucideUser className="w-5 h-5" />,
    link: "/profile",
  },
];
