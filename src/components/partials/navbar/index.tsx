import { toastError } from "@/components/ui/toast";
import { useLogoutMutation } from "@/redux/api/paperwork/auth-api";
import { useAppSelector } from "@/redux/hooks";
import { selectMe } from "@/redux/slices/auth-slice";
import {
  ChevronRight,
  Bell,
  LayoutPanelLeft,
  Globe,
  Search,
  ArrowRight,
  LucideCalendar,
  LucideInfo,
  LucideLayoutPanelLeft,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Input,
  Button,
  SheetTrigger,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  buttonVariants,
  cn,
  Separator,
} from "paperwork-ui";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export function Navbar() {
  // Hooks
  const { i18n } = useTranslation();
  const me = useAppSelector(selectMe);

  // RTK Query
  const [logout] = useLogoutMutation();

  // Actions
  const doLogout = async () => {
    await logout()
      .unwrap()
      .then(
        () => {
          window.location.assign("/");
        },
        (rejected: { status: number; data?: ApiResponse<null> }) => {
          toastError(
            rejected.data?.message ||
              "Terjadi kesalahan ketika melakukan logout"
          );
        }
      );
  };

  return (
    <nav className="sticky inset-x-0 z-30 mt-6 pointer-events-none top-2 lg:top-0 lg:fixed lg:ml-10 lg:px-0">
      <div className="container flex items-center justify-end h-full gap-4 mx-auto lg:px-0">
        <div className="flex-1">
          <SheetTrigger asChild>
            <Button
              variant={"ghost"}
              size={"icon"}
              className="rounded-full ring-[6px] ring-[#2B367433] lg:hidden bg-[#2B3674] hover:bg-[#2B3674] text-white hover:text-white pointer-events-auto"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </SheetTrigger>
        </div>
        <div className="flex items-center gap-2 p-1 md:p-2 rounded-full shadow-[14px_17px_40px_4px] shadow-black/10 bg-card pointer-events-auto">
          <div className="relative hidden mr-2 md:block">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 opacity-50 pointer-events-none">
              <Search className="w-4 h-4" />
            </div>
            <Input
              className="h-10 pl-10 rounded-full shadow-none bg-muted"
              placeholder="Search..."
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="flex border-transparent rounded-full text-primary hover:text-primary md:hidden"
          >
            <Search className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hidden border-transparent rounded-full text-primary hover:text-primary"
          >
            <Bell className="w-5 h-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="border-transparent rounded-full text-primary hover:text-primary hidden"
              >
                <Globe className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-0">
              <DropdownMenuItem
                className="py-2 rounded-b-none"
                onClick={() => i18n.changeLanguage("en")}
              >
                <span>English</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="border-t rounded-t-none py-2"
                onClick={() => i18n.changeLanguage("id")}
              >
                <span>Indonesia</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="border-transparent rounded-full text-primary hover:text-primary"
              >
                <div className="w-5 h-5 flex items-center justify-center rounded-full bg-primary hover:bg-primary-light">
                  <span className="text-white">i</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-0">
              <DropdownMenuItem>
                <Link
                  to="/member/information/information"
                  className="block px-4 py-3 text-sm text-primary hover:bg-primary-light hover:text-primary-hover"
                >
                  Sedang Tayang
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  to="/member/information/information"
                  className="block px-4 py-3 text-sm text-primary hover:bg-primary-light hover:text-primary-hover"
                >
                  Riwayat
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="ghost"
            size="icon"
            className="hidden border-transparent rounded-full text-primary hover:text-primary"
          >
            <LayoutPanelLeft className="w-5 h-5" />
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src={me?.user_avatar || ""}
                  alt={me?.user_fullname}
                />
                <AvatarFallback className="font-medium uppercase text-muted-foreground/50">
                  {me?.user_fullname.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent
              sideOffset={20}
              align="end"
              onOpenAutoFocus={(event) => {
                event.preventDefault();
              }}
              className="p-0 overflow-hidden rounded-lg w-80"
            >
              <div className="px-6 py-8 bg-gradient-to-r from-primary to-[#FE6E9A]">
                <div className="flex space-x-6">
                  <Avatar className="w-12 h-12">
                    <AvatarImage
                      src={me?.user_avatar || ""}
                      alt={me?.user_fullname}
                    />
                    <AvatarFallback className="font-medium uppercase text-muted-foreground/50">
                      {me?.user_fullname.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-primary-foreground">
                    <h4 className="text-lg font-semibold uppercase">
                      {me?.user_fullname}
                    </h4>
                    <span className="text-sm">{me?.user_email}</span>
                  </div>
                </div>
              </div>
              <div className="w-full p-2 space-y-1">
                {profileMenus.map((item, i) => {
                  return (
                    <Fragment key={i}>
                      <Link
                        to={item.href}
                        className={cn(
                          buttonVariants({ variant: "ghost" }),
                          "w-full justify-start align-items"
                        )}
                      >
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                      <Separator />
                    </Fragment>
                  );
                })}
                <Button onClick={doLogout} variant="ghost" className="w-full">
                  <span className="mr-6 text-primary">Keluar</span>
                  <span className="p-0.5 rounded-full text-primary-foreground ring-4 ring-primary/20 bg-primary">
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </nav>
  );
}

const profileMenus = [
  {
    title: "Aplikasi",
    href: "/member/application",
    icon: <LucideLayoutPanelLeft className="w-4 h-4 mr-3" />,
  },
  {
    title: "Kalender",
    href: "/member/information/event",
    icon: <LucideCalendar className="w-4 h-4 mr-3" />,
  },
  {
    title: "Pengumuman",
    href: "/member/information/information",
    icon: <LucideInfo className="w-4 h-4 mr-3" />,
  },
];

export default Navbar;
