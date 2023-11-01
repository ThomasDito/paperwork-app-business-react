import { FormikComboBox } from "@/components/formik";
import LoadingPage from "@/components/loading-page";
import { useLazyBusinessModuleGetQuery } from "@/redux/api/business/module-api";
import { useLazyBusinessPositionGetQuery } from "@/redux/api/business/position-api";
import {
  useBusinessRoleStoreMutation,
  useBusinessRoleUpdateMutation,
  useLazyBusinessRoleShowQuery,
} from "@/redux/api/business/role-api";
import { role_item_type } from "@/types/schema";
import { Form, Formik, FormikHelpers } from "formik";
import { withZodSchema } from "formik-validator-zod";
import { LucideLoader2, LucideSave } from "lucide-react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  buttonVariants,
  toastError,
  toastSuccess,
} from "paperwork-ui";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import z from "zod";

const formSchema = z.object({
  position_id: z.string().min(1, "Harus dipilih"),
  role_status: z.enum(["active", "inactive"]),
  roles: z.array(
    z.object({
      module_id: z.string(),
      action: z.enum(["read", "write", "no_access"]),
    })
  ),
});

export type RoleFormSchema = z.infer<typeof formSchema>;

export default function RoleForm() {
  // Hooks
  const navigate = useNavigate();
  const { id } = useParams();

  // RTK Query
  const [
    getPositions,
    {
      isLoading: getPositionsIsLoading,
      isFetching: getPositionsIsFetching,
      isError: getPositionsIsError,
      data: positions = [],
    },
  ] = useLazyBusinessPositionGetQuery();

  const [
    getModules,
    {
      isLoading: getModulesIsLoading,
      isFetching: getModulesIsFetching,
      isError: getModulesIsError,
      data: modules = [],
    },
  ] = useLazyBusinessModuleGetQuery();

  const [
    showRole,
    {
      isLoading: showRoleIsLoading,
      isFetching: showRoleIsFetching,
      isError: showRoleIsError,
    },
  ] = useLazyBusinessRoleShowQuery();

  const [storeRole, { isLoading: storeRoleIsLoading }] =
    useBusinessRoleStoreMutation();

  const [updateRole] = useBusinessRoleUpdateMutation();

  // States
  const [initialValues, setInitialValues] = useState<RoleFormSchema>({
    position_id: "",
    role_status: "active",
    roles: [],
  });

  const [selectedRoles, setSelectedRoles] = useState<{
    [module_id: string]: role_item_type;
  }>({});

  useEffect(() => {
    getPositions();
    getModules();
  }, []);

  useEffect(() => {
    if (id) detailRole(id);
  }, [id]);

  // Actions
  const detailRole = async (id: string) => {
    await showRole(id)
      .unwrap()
      .then((role) => {
        setInitialValues({
          position_id: role.position_id,
          role_status: role.role_status,
          roles: [],
        });

        const roleItems: { [module_id: string]: role_item_type } = {};
        role.role_items?.forEach((role) => {
          roleItems[role.module_id] = role.role_item_type;
        });

        setSelectedRoles(roleItems);
      })
      .catch((rejected: { message?: string; data?: ApiResponse<unknown> }) => {
        console.log(rejected);
        toastError(
          rejected?.data?.message || "Terjadi kesalahan ketika mengambil data"
        );
      });
  };

  const onSubmit = async (
    values: RoleFormSchema,
    formikHelpers: FormikHelpers<RoleFormSchema>
  ) => {
    const payload: RoleFormSchema = { ...values };

    payload.roles = [];
    modules.forEach((module) => {
      let action: role_item_type = "no_access";
      if (selectedRoles[module.id]) {
        action = selectedRoles[module.id];
      }

      payload.roles.push({
        module_id: module.id,
        action,
      });
    });

    if (!id) {
      await storeRole(payload)
        .unwrap()
        .then((response) => {
          toastSuccess(response?.message || "Hak akses berhasil ditambahkan");
          navigate(`/business/organization/role`);
        })
        .catch((rejected: { status: number; data?: ApiResponse<unknown> }) => {
          const message = rejected.data?.message;

          if (rejected.status === 422 && rejected.data?.errors) {
            formikHelpers.setErrors(
              rejected.data.errors as unknown as Record<string, string>
            );
          }
          toastError(message || "Terjadi kesalahan ketika menyimpan data");
        });
    } else {
      await updateRole({ id, payload })
        .unwrap()
        .then((response) => {
          toastSuccess(response?.message || "Hak akses berhasil disimpan");
          navigate(`/business/organization/role`);
        })
        .catch((rejected: { status: number; data?: ApiResponse<unknown> }) => {
          const message = rejected.data?.message;

          if (rejected.status === 422 && rejected.data?.errors) {
            formikHelpers.setErrors(
              rejected.data.errors as unknown as Record<string, string>
            );
          }
          toastError(message || "Terjadi kesalahan ketika menyimpan data");
        });
    }
  };

  if (
    showRoleIsLoading ||
    showRoleIsFetching ||
    showRoleIsError ||
    getModulesIsLoading ||
    getModulesIsError ||
    getModulesIsFetching
  ) {
    return <LoadingPage />;
  }

  return (
    <Formik
      initialValues={initialValues}
      validate={withZodSchema(formSchema)}
      onSubmit={onSubmit}
      enableReinitialize={true}
    >
      {() => {
        return (
          <Form>
            <div className="bg-card border rounded-md max-w-4xl mx-auto">
              <div className="p-5 flex flex-col items-center justify-between space-y-6 border-0 md:space-y-0 md:flex-row">
                <h3 className="text-2xl font-semibold tracking-tight scroll-m-20">
                  Tambah Hak Akses
                </h3>
              </div>
              <div className="border-t rounded-b-md bg-card p-5">
                <div className="pb-4">
                  <div className="space-y-2">
                    <FormikComboBox
                      label="Jabatan"
                      name="position_id"
                      className="w-full"
                      placeholder="Pilih Jabatan"
                      placeholderNotFound="Jabatan tidak ditemukan"
                      placeholderSearch="Cari Jabatan..."
                      required
                      values={positions.map((position) => {
                        return {
                          value: position.id,
                          label: position.position_name,
                        };
                      })}
                    />
                    {(getPositionsIsFetching || getPositionsIsLoading) && (
                      <div className="flex item-center text-xs text-muted-foreground">
                        <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
                        Memuat data jabatan...
                      </div>
                    )}
                    {getPositionsIsError && (
                      <span className="mt-2 text-xs text-destructive">
                        Gagal memuat data.{" "}
                        <span
                          onClick={() => getPositions()}
                          className="font-bold hover:underline cursor-pointer"
                        >
                          Ulangi
                        </span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <Table className="border-t">
                  <TableHeader className="border-b">
                    <TableRow>
                      <TableHead>Modul</TableHead>
                      <TableHead className="text-center w-[150px]">
                        Blokir
                      </TableHead>
                      <TableHead className="text-center w-[150px]">
                        Baca
                      </TableHead>
                      <TableHead className="text-center w-[150px]">
                        Baca &amp; Tulis
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {modules.map((module, i) => {
                      return (
                        <TableRow key={i}>
                          <TableCell>{module.module_name}</TableCell>
                          <TableCell className="text-center">
                            <input
                              type="radio"
                              value="no_access"
                              name={module.id}
                              className="w-4 h-4"
                              checked={
                                selectedRoles[module.id] === "no_access" ||
                                !selectedRoles[module.id]
                              }
                              onChange={() => {
                                setSelectedRoles({
                                  ...selectedRoles,
                                  [module.id]: "no_access",
                                });
                              }}
                            />
                          </TableCell>
                          <TableCell className="text-center">
                            <input
                              type="radio"
                              value="read"
                              name={module.id}
                              className="w-4 h-4"
                              checked={selectedRoles[module.id] === "read"}
                              onChange={() => {
                                setSelectedRoles({
                                  ...selectedRoles,
                                  [module.id]: "read",
                                });
                              }}
                            />
                          </TableCell>
                          <TableCell className="text-center">
                            <input
                              type="radio"
                              value="write"
                              name={module.id}
                              className="w-4 h-4"
                              checked={selectedRoles[module.id] === "write"}
                              onChange={() => {
                                setSelectedRoles({
                                  ...selectedRoles,
                                  [module.id]: "write",
                                });
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
              <div className="flex justify-end space-x-5 p-5 border-t">
                <Link
                  to={`/business/organization/role`}
                  className={buttonVariants({ variant: "outline" })}
                >
                  Batal
                </Link>
                <Button
                  disabled={storeRoleIsLoading}
                  type="submit"
                  className="flex items-center"
                >
                  {storeRoleIsLoading ? (
                    <>
                      <LucideLoader2 className="w-5 h-5 mr-2 animate-spin" />
                      Mohon Tunggu
                    </>
                  ) : (
                    <>
                      <LucideSave className="w-5 h-5 mr-2" />
                      Simpan
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
