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
  Input,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Button,
} from "paperwork-ui";
import { LucideEye, LucideSearch, MoreHorizontal } from "lucide-react";
import { useLazyGetOrganizationsQuery } from "@/redux/api/superadmin/manage-organization/organization-api";
import config from "@/lib/config";
import moment from "moment";
import { ORGANIZATION_TYPE_LABEL } from "@/consts/global";
import { debounce } from "lodash";
import PaginationLimit from "@/components/partials/pagination/limit";
import PaginationButton from "@/components/partials/pagination/button";
import OrganizationSubmissionIndexSkeleton from "@/pages/organization/submission/components/skeleton";
import BadgeStatus from "@/components/ui/badge-status";
import { Link, useNavigate } from "react-router-dom";

export default function OrganizationSubmissionIndex() {
  // Hooks
  const navigate = useNavigate();

  // RTK Query
  const [
    getOrganizations,
    { data: organizations, isLoading: getOrganizationsIsLoading, isFetching: getOrganizationsIsFetching, isError: getOrganizationsIsError },
  ] = useLazyGetOrganizationsQuery();

  // States
  const tableIsLoading = getOrganizationsIsLoading || getOrganizationsIsFetching || getOrganizationsIsError;

  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string | undefined>(undefined);

  const [initialParams, setInitialParams] = useState<PaginationParams<organization> & { type: "submission" | "accepted" }>({
    order_by: "organization_name",
    page,
    limit,
    type: "submission",
  });

  // React Hooks
  useEffect(() => {
    if (initialParams) {
      getOrganizations(initialParams);
    }
  }, [initialParams]);

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
    <>
      <div className="flex flex-col items-center justify-between pb-5 space-y-6 border-0 md:space-y-0 md:flex-row">
        <h3 className="text-2xl font-semibold tracking-tight scroll-m-20">Daftar Pengajuan Organisasi</h3>
        <div className="relative flex items-center">
          <div className="absolute inset-y-0 flex items-center pointer-events-none left-3">
            <LucideSearch size={18} className="text-muted-foreground" />
          </div>
          <Input
            className="w-full pl-10 min-w-[300px]"
            type="search"
            placeholder="Pencarian..."
            value={search || ""}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="border rounded-md shadow-sm bg-card">
        <Table className="whitespace-nowrap">
          <TableHeader>
            <TableRow>
              <TableHead className="h-auto p-5">Nama Organisasi</TableHead>
              <TableHead className="h-auto p-5">Jenis</TableHead>
              <TableHead className="h-auto p-5">Alamat</TableHead>

              <TableHead className="h-auto p-5 whitespace-nowrap">Tanggal Pengajuan</TableHead>
              <TableHead className="h-auto p-5 text-center">Status</TableHead>
              <TableHead className="h-auto p-5 text-center">Aksi</TableHead>
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
                        <Link to={`/organization/submission/${organization.id}`}>
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={organization.organization_logo || ""} alt={organization.organization_name} className="object-cover" />
                            <AvatarFallback className="font-medium uppercase text-muted-foreground/50">
                              {organization.organization_name.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                        </Link>
                        <div className="flex flex-1 flex-col space-y-1 max-w-[350px]">
                          <Link to={`/organization/submission/${organization.id}`} className="text-base font-medium break-all hover:underline line-clamp-1">
                            {organization.organization_name}
                          </Link>
                          <div className="text-sm break-all text-muted-foreground line-clamp-1">
                            {organization.organization_nicename}
                            {config.SUBDOMAIN_URL}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="p-5">{ORGANIZATION_TYPE_LABEL[organization.organization_type]}</TableCell>

                    <TableCell className="p-5">
                      <div className="break-all line-clamp-1 max-w-[300px]">{organization.organization_address_1}</div>
                    </TableCell>
                    <TableCell className="p-5">{moment(organization.updated_at).format("DD MMMM YYYY")}</TableCell>
                    <TableCell className="p-5 text-center">
                      <BadgeStatus organization_status={organization.organization_status} />
                    </TableCell>
                    <TableCell className="relative p-5 text-center">
                      <Button
                        variant="ghost"
                        className="relative"
                        onClick={() => {
                          navigate(`/organization/submission/${organization.id}`);
                        }}
                      >
                        <span className="sr-only">Detail</span>
                        <LucideEye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}

            {tableIsLoading && <OrganizationSubmissionIndexSkeleton />}

            {!tableIsLoading && !organizations?.data.length && (
              <TableRow>
                <TableCell className="p-5 text-center" colSpan={6}>
                  Tidak ada data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex flex-col items-center justify-between px-5 py-3 space-y-4 border-t md:flex-row md:space-y-0">
          <PaginationLimit limit={limit} handleChange={(value) => setLimit(value)} pagination={organizations?.pagination} />
          {organizations?.pagination && <PaginationButton pagination={organizations.pagination} handleChange={(page) => setPage(page)} />}
        </div>
      </div>
    </>
  );
}
