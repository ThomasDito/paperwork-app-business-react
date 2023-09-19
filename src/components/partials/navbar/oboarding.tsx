import { useAppSelector } from "@/redux/hooks";
import { selectMe } from "@/redux/slices/auth-slice";
import {
  ChevronRight,
  Bell,
  LayoutPanelLeft,
  Globe,
  Search,
  User2,
  ArrowRight,
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
import { Link } from "react-router-dom";

export function NavbarOnboarding() {
  const me = useAppSelector(selectMe);

  return (
    <nav className="mt-6 pointer-events-none">
      <div className="flex items-center justify-end h-full gap-4 mx-auto lg:px-0">
        <div className="flex items-center gap-2 p-1 md:p-2 rounded-full shadow-[14px_17px_40px_4px] shadow-black/10 bg-card pointer-events-auto">
          <Popover>
            <PopoverTrigger asChild>
              <Avatar>
                <AvatarImage
                  src={
                    me?.user_avatar ||
                    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
                  }
                  alt="@shadcn"
                />
                <AvatarFallback />
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
                  <Avatar className="w-12 h-12 ring-4 ring-success">
                    <AvatarImage
                      src={
                        me?.user_avatar ||
                        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
                      }
                      alt={me?.user_fullname}
                    />
                    <AvatarFallback />
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
                <Button variant="ghost" className="w-full">
                  <span className="mr-6 text-primary">Logout</span>
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
    title: "View Profile",
    href: "/",
    icon: <User2 className="w-4 h-4 mr-3" />,
  },
  {
    title: "Invite Colleagues",
    href: "/",
    icon: <User2 className="w-4 h-4 mr-3" />,
  },
  {
    title: "Community",
    href: "/",
    icon: <User2 className="w-4 h-4 mr-3" />,
  },
  {
    title: "Team",
    href: "/",
    icon: <User2 className="w-4 h-4 mr-3" />,
  },
  {
    title: "Support",
    href: "/",
    icon: <User2 className="w-4 h-4 mr-3" />,
  },
];
