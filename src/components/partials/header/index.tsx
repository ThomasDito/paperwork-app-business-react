import { Link } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { Breadcrumbs } from "../breadcrumbs";
import { cn } from "paperwork-ui";
import { useAppSelector } from "@/redux/hooks";
import { selectOrganization } from "@/redux/slices/auth-slice";

type HeaderProps = {
  className?: string;
};

export function Header({ className }: HeaderProps) {
  const organization = useAppSelector(selectOrganization);

  const routes = [
    { path: "/", breadcrumb: null },
    { path: "/organization", breadcrumb: null },
    { path: "/organization/submission", breadcrumb: "Form Pengajuan" },
  ];
  const breadcrumbs = useBreadcrumbs(routes);

  return (
    <header
      className={cn("container w-full mx-auto mt-6 hidden md:block", className)}
    >
      <Breadcrumbs separator={"/"} className="mb-1 lg:mb-2">
        {breadcrumbs.map(({ match, breadcrumb }) => (
          <Link
            key={match.pathname}
            to={match.pathname}
            className={cn(
              "inline-flex items-center text-sm font-medium text-foreground hover:text-primary"
            )}
          >
            {breadcrumb}
          </Link>
        ))}
      </Breadcrumbs>
      <h1 className="text-2xl font-semibold tracking-tight text-center md:text-3xl md:text-left">
        {organization?.organization_name}
      </h1>
    </header>
  );
}
