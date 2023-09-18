import { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Input,
  Button,
} from "paperwork-ui";
import { MoreHorizontal } from "lucide-react";
import { LucideEye, LucideLayoutGrid, LucideSearch } from "lucide-react";
import { useLazyGetUserOrganizationsQuery } from "@/redux/api/superadmin/manage-user/organization-api";
import config from "@/lib/config";
import { ORGANIZATION_TYPE_LABEL } from "@/consts/global";
import { debounce } from "lodash";
import PaginationLimit from "@/components/partials/pagination/limit";
import PaginationButton from "@/components/partials/pagination/button";
import { Link, useNavigate, useParams } from "react-router-dom";
import BadgeStatus from "@/components/ui/badge-status";
import OrganizationSkeleton from "@/pages/user/components/skeleton/organization-skeleton";

export default function OrganizationTabIndex() {
  // Hooks
  const navigate = useNavigate();
  const { id } = useParams();

  // RTK Query
  const [
    getOrganizations,
    { data: organizations, isLoading: getOrganizationsIsLoading, isFetching: getOrganizationsIsFetching, isError: getOrganizationsIsError },
  ] = useLazyGetUserOrganizationsQuery();

  // States
  const tableIsLoading = getOrganizationsIsLoading || getOrganizationsIsFetching || getOrganizationsIsError;

  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string | undefined>(undefined);

  const [initialParams, setInitialParams] = useState<PaginationParams<organization>>({
    order_by: "organization_name",
    page,
    limit,
  });

  // React Hooks
  useEffect(() => {
    if (initialParams && id) {
      getOrganizations({ user_id: id, params: initialParams });
    }
  }, [initialParams, id]);

  useEffect(() => {
    setInitialParams({
      ...initialParams,
      page,
      limit,
    });
  }, [page, limit]);

  const doSearch = useCallback(
    debounce((value) => {
      setInitialParams({
        ...initialParams,
        search: value,
      });
    }, 750),
    [initialParams]
  );

  useEffect(() => {
    if (typeof search !== "undefined") doSearch(search);
  }, [search]);

  return (
    <div className="py-2">
      <div className="border rounded-md shadow bg-card">
        <div className="flex flex-col items-start justify-between px-4 py-6 space-y-2 border-0 border-b md:items-center md:space-y-0 md:flex-row">
          <div className="flex items-center font-semibold">
            <LucideLayoutGrid className="w-4 h-4 mr-2" /> Daftar Organisasi
          </div>
          <div className="relative flex items-center">
            <div className="absolute inset-y-0 flex items-center pointer-events-none left-3">
              <LucideSearch size={18} className="text-muted-foreground" />
            </div>
            <Input className="w-full pl-10" type="search" placeholder="Pencarian..." value={search || ""} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        <div className="border-b">
          <Table className="whitespace-nowrap">
            <TableHeader>
              <TableRow>
                <TableHead className="px-5 py-4">Nama Organisasi</TableHead>
                <TableHead className="px-5 py-4">Jenis</TableHead>
                <TableHead className="px-5 py-4 text-center">Tipe Anggota</TableHead>
                <TableHead className="px-5 py-4 text-center">Jumlah Anggota</TableHead>
                <TableHead className="px-5 py-4 text-center">Status</TableHead>
                <TableHead className="px-5 py-4 text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-sm">
              {!tableIsLoading &&
                organizations &&
                organizations.data.map((organization) => {
                  return (
                    <TableRow key={organization.id}>
                      <TableCell className="p-5">
                        <div className="flex items-center space-x-4">
                          <Link to={`/organization/organization-list/${organization.id}`}>
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={organization.organization_logo || ""} alt={organization.organization_name} />
                              <AvatarFallback className="font-medium uppercase text-muted-foreground/50">
                                {organization.organization_name.substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                          </Link>
                          <div className="flex flex-col flex-1 space-y-1">
                            <Link to={`/organization/organization-list/${organization.id}`} className="text-base font-medium hover:underline">
                              {organization.organization_name}
                            </Link>
                            <div className="text-sm text-muted-foreground">
                              {organization.organization_nicename}
                              {config.SUBDOMAIN_URL}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="p-5">{ORGANIZATION_TYPE_LABEL[organization.organization_type]}</TableCell>
                      <TableCell className="p-5 text-center">{organization.founder_id === id ? "Pendiri" : "Anggota"}</TableCell>
                      <TableCell className="p-5 text-center">{organization._count.user_organizations || 0}</TableCell>
                      <TableCell className="p-5 text-center">
                        <BadgeStatus organization_status={organization.organization_status} />
                      </TableCell>
                      <TableCell className="p-5 text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="w-8 h-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                if (organization.organization_status === "active" || organization.organization_status === "inactive") {
                                  navigate(`/organization/organization-list/${organization.id}`);
                                } else {
                                  navigate(`/organization/submission/${organization.id}`);
                                }
                              }}
                            >
                              <LucideEye className="w-4 h-4 mr-3" /> Detail
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}

              {tableIsLoading && <OrganizationSkeleton />}

              {!tableIsLoading && !organizations?.data.length && (
                <TableRow>
                  <TableCell className="p-5 text-center" colSpan={6}>
                    Tidak ada data
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between p-5">
          <PaginationLimit limit={limit} handleChange={(value) => setLimit(value)} pagination={organizations?.pagination} />
          {organizations?.pagination && <PaginationButton pagination={organizations.pagination} handleChange={(page) => setPage(page)} />}
        </div>
      </div>
    </div>
  );
}
