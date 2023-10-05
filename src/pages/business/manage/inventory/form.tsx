import {
  FormikComboBox,
  FormikDatePicker,
  FormikInput,
} from "@/components/formik";
import LoadingPage from "@/components/loading-page";
import {
  useBusinessInventoryStoreMutation,
  useBusinessInventoryUpdateMutation,
  useLazyBusinessInventoryShowQuery,
} from "@/redux/api/business/inventory-api";
import { Form, Formik, FormikHelpers } from "formik";
import { withZodSchema } from "formik-validator-zod";
import { LucideLoader2, LucidePlus, LucideSave } from "lucide-react";
import moment from "moment";
import { Button, buttonVariants, toastError, toastSuccess } from "paperwork-ui";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import z from "zod";
import { useLazyBusinessEmployeeGetQuery } from "@/redux/api/business/employee-api";

const formSchema = z
  .object({
    inventory_name: z
      .string()
      .trim()
      .min(1, "Harus diisi")
      .max(150, "Maksimal 150 karakter"),
    inventory_number: z
      .string()
      .trim()
      .min(1, "Harus diisi")
      .max(150, "Maksimal 150 karakter"),
    inventory_buy_date: z.date({ coerce: true }),
    employee_id: z
      .string()
      .trim()
      .min(1, "Harus dipilih")
      .nullish()
      .or(z.literal("")),
    inventory_start_date: z.date({ coerce: true }).nullish(),
    inventory_end_date: z.date({ coerce: true }).nullish(),
  })
  .refine(
    (data) => {
      return (
        !data.employee_id || (data.employee_id && data.inventory_start_date)
      );
    },
    {
      message: "Harus dipilih",
      path: ["inventory_start_date"],
    }
  )
  .refine(
    (data) => {
      return !data.employee_id || (data.employee_id && data.inventory_end_date);
    },
    {
      message: "Harus dipilih",
      path: ["inventory_end_date"],
    }
  );

export type InventoryFormSchema = z.infer<typeof formSchema>;

export default function InventoryForm() {
  // Hooks
  const navigate = useNavigate();
  const { id } = useParams();

  // RTK Query
  const [
    getEmployees,
    {
      data: employees = [],
      isLoading: getEmployeesIsLoading,
      isFetching: getEmployeesIsFetching,
      isError: getEmployeesIsError,
    },
  ] = useLazyBusinessEmployeeGetQuery();

  const [
    showInventory,
    {
      isLoading: showInventoryIsLoading,
      isFetching: showInventoryIsFetching,
      isError: showInventoryIsError,
    },
  ] = useLazyBusinessInventoryShowQuery();

  const [storeInventory, { isLoading: storeInventoryIsLoading }] =
    useBusinessInventoryStoreMutation();

  const [updateInventory, { isLoading: updateInventoryIsLoading }] =
    useBusinessInventoryUpdateMutation();

  // States
  const [initialValues, setInitialValues] = useState<InventoryFormSchema>({
    inventory_name: "",
    inventory_number: "",
    inventory_buy_date: new Date(),
  });

  useEffect(() => {
    getEmployees();
  }, []);

  useEffect(() => {
    if (id) detailInventory(id);
  }, [id]);

  // Actions
  const detailInventory = async (id: string) => {
    await showInventory(id)
      .unwrap()
      .then((inventory) => {
        setInitialValues({
          inventory_name: inventory.inventory_name,
          inventory_number: inventory.inventory_number,
          inventory_buy_date: moment(inventory.inventory_buy_date).toDate(),
          employee_id: inventory.employee_id,
          inventory_start_date: inventory.inventory_start_date
            ? moment(inventory.inventory_start_date).toDate()
            : null,
          inventory_end_date: inventory.inventory_end_date
            ? moment(inventory.inventory_end_date).toDate()
            : null,
        });
      })
      .catch((rejected: { message?: string; data?: ApiResponse<unknown> }) => {
        console.log(rejected);
        toastError(
          rejected?.data?.message || "Terjadi kesalahan ketika mengambil data"
        );
      });
  };

  const onSubmit = async (
    values: InventoryFormSchema,
    formikHelpers: FormikHelpers<InventoryFormSchema>
  ) => {
    const payload: InventoryFormSchema = { ...values };

    payload.inventory_buy_date = moment(payload.inventory_buy_date).toDate();

    if (payload.employee_id) {
      payload.inventory_start_date = moment(
        payload.inventory_start_date
      ).toDate();

      payload.inventory_end_date = moment(payload.inventory_end_date).toDate();
    } else {
      payload.employee_id = null;
      payload.inventory_start_date = null;
      payload.inventory_end_date = null;
    }

    if (!id) {
      await storeInventory(payload)
        .unwrap()
        .then((response) => {
          toastSuccess(response?.message || "Inventaris berhasil ditambahkan");
          navigate(`/business/manage/inventory`);
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
      await updateInventory({ id, payload })
        .unwrap()
        .then((response) => {
          toastSuccess(response?.message || "Inventaris berhasil disimpan");
          navigate(`/business/manage/inventory`);
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
    showInventoryIsLoading ||
    showInventoryIsFetching ||
    showInventoryIsError
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
      {(formik) => {
        return (
          <Form>
            <div className="bg-card border rounded-md max-w-4xl mx-auto">
              <div className="p-5 flex flex-col items-center justify-between space-y-6 border-0 md:space-y-0 md:flex-row">
                <h3 className="text-2xl font-semibold tracking-tight scroll-m-20">
                  {id ? "Ubah" : "Tambah"} Inventaris
                </h3>
              </div>
              <div className="border-t rounded-b-md bg-card p-5 space-y-7">
                <FormikInput
                  required
                  label="Nomor Inventaris"
                  name="inventory_number"
                  id="inventory_number"
                  placeholder="Nomor Inventaris"
                />
                <FormikInput
                  required
                  label="Nama Inventaris"
                  name="inventory_name"
                  id="inventory_name"
                  placeholder="Nama Inventaris"
                />
                <FormikDatePicker
                  required
                  label="Tanggal Pembelian"
                  name="inventory_buy_date"
                  id="inventory_buy_date"
                  placeholder="Tanggal Pembelian"
                  className="flex w-full"
                />

                <div className="space-y-7">
                  <div className="space-y-2">
                    <FormikComboBox
                      label="Penanggung Jawab"
                      name="employee_id"
                      className="w-full"
                      placeholder="Pilih Penanggung Jawab"
                      placeholderNotFound="Penanggung jawab tidak ditemukan"
                      placeholderSearch="Cari Penanggung jawab..."
                      values={employees.map((employee) => {
                        return {
                          value: employee.id,
                          label: employee.employee_name,
                        };
                      })}
                    />
                    {(getEmployeesIsFetching || getEmployeesIsLoading) && (
                      <div className="flex item-center text-xs text-muted-foreground">
                        <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
                        Memuat data...
                      </div>
                    )}
                    {getEmployeesIsError && (
                      <span className="mt-2 text-xs text-destructive">
                        Gagal memuat data.{" "}
                        <span
                          onClick={() => getEmployees()}
                          className="font-bold hover:underline cursor-pointer"
                        >
                          Ulangi
                        </span>
                      </span>
                    )}
                  </div>
                  {formik.values.employee_id && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <FormikDatePicker
                        required
                        label="Tanggal Mulai"
                        name="inventory_start_date"
                        id="inventory_start_date"
                        placeholder="Tanggal Mulai"
                        className="flex w-full"
                      />

                      <FormikDatePicker
                        required
                        label="Tanggal Berakhir"
                        name="inventory_end_date"
                        id="inventory_end_date"
                        placeholder="Tanggal Berakhir"
                        className="flex w-full"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-end space-x-5 p-5 border-t">
                <Link
                  to={`/business/manage/inventory`}
                  className={buttonVariants({ variant: "outline" })}
                >
                  Batal
                </Link>
                <Button
                  disabled={storeInventoryIsLoading || updateInventoryIsLoading}
                  type="submit"
                  className="flex items-center"
                >
                  {storeInventoryIsLoading || updateInventoryIsLoading ? (
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
