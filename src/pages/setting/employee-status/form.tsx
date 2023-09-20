import { toastError, toastSuccess } from "@/components/ui/toast";
import {
  useBusinessEmployeeStatusStoreMutation,
  useBusinessEmployeeStatusUpdateMutation,
  useLazyBusinessEmployeeStatusShowQuery,
} from "@/redux/api/business/employee-status-api";
import { Form, Formik } from "formik";
import { withZodSchema } from "formik-validator-zod";
import { LucideLoader2 } from "lucide-react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  FormikInput,
  Label,
  Switch,
} from "paperwork-ui";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

const formSchema = z.object({
  employee_status_name: z
    .string()
    .min(1, "Harus diisi")
    .max(150, "Maksimal 150 karakter")
    .trim(),
  employee_status_status: z.enum(["active", "inactive"]),
});

export type EmployeeStatusFormSchema = z.infer<typeof formSchema>;

export default function EmployeeStatusForm() {
  // Hooks
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  // RTK Query
  const [showEmployeeStatus, { isLoading: showIsLoading }] =
    useLazyBusinessEmployeeStatusShowQuery();

  const [storeEmployeeStatus, { isLoading: storeIsLoading }] =
    useBusinessEmployeeStatusStoreMutation();

  const [updateEmployeeStatus, { isLoading: updateIsLoading }] =
    useBusinessEmployeeStatusUpdateMutation();

  const isLoading = showIsLoading || storeIsLoading || updateIsLoading;

  // States
  const [initialValues, setInitialValues] = useState<EmployeeStatusFormSchema>({
    employee_status_name: "",
    employee_status_status: "active",
  });

  useEffect(() => {
    if (id) detailEmployeeStatus(id);
  }, [id]);

  const detailEmployeeStatus = async (id: string) => {
    await showEmployeeStatus(id)
      .unwrap()
      .then((branch) => {
        setInitialValues({
          employee_status_name: branch.employee_status_name,
          employee_status_status: branch.employee_status_status,
        });
      })
      .catch((rejected: { message?: string; data?: ApiResponse<unknown> }) => {
        toastError(
          rejected?.data?.message || "Terjadi kesalahan ketika mengambil data"
        );
        closeModal();
      });
  };

  const onSubmit = async (values: EmployeeStatusFormSchema) => {
    if (!id) {
      await storeEmployeeStatus(values)
        .unwrap()
        .then((response) => {
          toastSuccess(
            response?.message || "Status kepegawaian berhasil ditambahkan"
          );
          closeModal();
        })
        .catch(
          (rejected: { message?: string; data?: ApiResponse<unknown> }) => {
            toastError(
              rejected?.data?.message ||
                "Terjadi kesalahan ketika menyimpan data"
            );
          }
        );
    } else {
      await updateEmployeeStatus({ id, payload: values })
        .unwrap()
        .then((response) => {
          toastSuccess(
            response?.message || "Status kepegawaian berhasil diubah"
          );
          closeModal();
        })
        .catch(
          (rejected: { message?: string; data?: ApiResponse<unknown> }) => {
            toastError(
              rejected?.data?.message ||
                "Terjadi kesalahan ketika menyimpan data"
            );
          }
        );
    }
  };

  const closeModal = () => navigate(location.state.previousLocation);

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
            <Dialog open={true} onOpenChange={() => closeModal()}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {id ? "Ubah" : "Tambah"} Status Kepegawaian
                  </DialogTitle>
                  <div className="pt-8">
                    <FormikInput
                      required
                      aria-autocomplete="none"
                      label="Nama Status Kepegawaian"
                      name="employee_status_name"
                      id="employee_status_name"
                      placeholder="Nama Status Kepegawaian"
                    />
                    <div className="mt-7 flex flex-col space-y-5">
                      <Label>Aktif</Label>
                      <Switch
                        checked={
                          formik.values.employee_status_status === "active"
                        }
                        onCheckedChange={(checked) => {
                          formik.setFieldTouched(
                            "employee_status_status",
                            true
                          );
                          formik.setFieldValue(
                            "employee_status_status",
                            checked ? "active" : "inactive"
                          );
                        }}
                      />
                    </div>
                  </div>
                </DialogHeader>
                <DialogFooter className="pt-8">
                  <Button
                    className="w-full mt-2 mr-1 bg-card sm:mt-0"
                    type="button"
                    variant={"outline"}
                    onClick={() => closeModal()}
                  >
                    Batal
                  </Button>
                  <Button
                    size={"default"}
                    type="submit"
                    className="w-full"
                    disabled={isLoading || !(formik.dirty && formik.isValid)}
                    onClick={() => formik.submitForm()}
                  >
                    {isLoading ? (
                      <LucideLoader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      "Simpan"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </Form>
        );
      }}
    </Formik>
  );
}
