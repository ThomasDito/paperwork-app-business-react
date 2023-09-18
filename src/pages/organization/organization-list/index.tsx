import { useCallback, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Input, Button, Switch } from "paperwork-ui";
import { LucideEdit, LucideEye, LucideSearch } from "lucide-react";
import { useChangeStatusOrganizationMutation, useLazyGetOrganizationsQuery } from "@/redux/api/superadmin/manage-organization/organization-api";
import config from "@/lib/config";
import moment from "moment";
import { ORGANIZATION_TYPE_LABEL } from "@/consts/global";
import OrganizationListIndexSkeleton from "@/pages/organization/organization-list/components/skeleton";
import { debounce } from "lodash";
import { toastError, toastSuccess } from "@/components/ui/toast";
import PaginationLimit from "@/components/partials/pagination/limit";
import PaginationButton from "@/components/partials/pagination/button";
import { Link, useNavigate } from "react-router-dom";

export default function OrganizationListIndex() {
  // Hooks
  const navigate = useNavigate();

  // RTK Query
  const [
    getOrganizations,
    { data: organizations, isLoading: getOrganizationsIsLoading, isFetching: getOrganizationsIsFetching, isError: getOrganizationsIsError },
  ] = useLazyGetOrganizationsQuery();

  const [changeStatusOrganization] = useChangeStatusOrganizationMutation();

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

  // Actions
  const doChangeStatus = async (organization_id: string, checked: boolean) => {
    await changeStatusOrganization({
      organization_id,
      status: checked ? "active" : "inactive",
    })
      .unwrap()
      .then(
        (response) => {
          toastSuccess(response?.message || "Perubahan berhasil disimpan");
        },
        (rejected: { data: ApiResponse<unknown> }) => {
          toastError(rejected?.data?.message || "Terjadi kesalahan teknis. Silahkan coba kembali");
        }
      );

    getOrganizations(initialParams);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-between pb-5 space-y-6 border-0 md:space-y-0 md:flex-row">
        <h3 className="text-2xl font-semibold tracking-tight scroll-m-20">Daftar Organisasi</h3>
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
              <TableHead className="h-auto p-5 text-center">Jumlah Anggota</TableHead>
              <TableHead className="h-auto p-5 text-center">Jumlah Aplikasi</TableHead>
              <TableHead className="h-auto p-5">Aktif</TableHead>
              <TableHead className="h-auto p-5">Tanggal Bergabung</TableHead>
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
                        <Link to={`/organization/organization-list/${organization.id}`}>
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={organization.organization_logo || ""} alt={organization.organization_name} className="object-cover" />
                            <AvatarFallback className="font-medium uppercase text-muted-foreground/50">
                              {organization.organization_name.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                        </Link>
                        <div className="flex flex-col flex-1 space-y-1">
                          <Link to={`/organization/organization-list/${organization.id}`} className="text-base font-medium hover:underline whitespace-nowrap">
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
                    <TableCell className="p-5 text-center">{organization._count.user_organizations || 0}</TableCell>
                    <TableCell className="p-5 text-center">0</TableCell>
                    <TableCell className="p-5">
                      <Switch
                        defaultChecked={organization.organization_status === "active"}
                        onCheckedChange={(checked) => doChangeStatus(organization.id, checked)}
                      />
                    </TableCell>
                    <TableCell className="p-5">{moment(organization.created_at).format("DD MMMM YYYY")}</TableCell>
                    <TableCell className="p-5 text-center">
                      <div className="flex justify-center space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="relative"
                          onClick={() => {
                            navigate(`/organization/organization-list/${organization.id}`);
                          }}
                        >
                          <LucideEye className="w-4 h-4" />
                          <span className="sr-only">Detail</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="relative">
                          <LucideEdit className="w-4 h-4" />
                          <span className="sr-only">Ubah</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}

            {tableIsLoading && <OrganizationListIndexSkeleton />}

            {!tableIsLoading && !organizations?.data.length && (
              <TableRow>
                <TableCell className="p-5 text-center" colSpan={7}>
                  Tidak ada data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex flex-col items-center justify-between px-5 py-3 space-y-4 border-t md:flex-row md:space-y-0">
          <PaginationLimit limit={limit} handleChange={setLimit} pagination={organizations?.pagination} />
          {organizations?.pagination && <PaginationButton pageLimit={6} pagination={organizations.pagination} handleChange={(page) => setPage(page)} />}
        </div>
      </div>
    </>
  );
}
