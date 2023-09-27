import { FormikInput } from "@/components/formik";
import { toastError, toastSuccess } from "@/components/ui/toast";
import {
  useBusinessDivisionStoreMutation,
  useBusinessDivisionUpdateMutation,
  useLazyBusinessDivisionShowQuery,
} from "@/redux/api/business/division-api";
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
  Label,
  Switch,
} from "paperwork-ui";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

const formSchema = z.object({
  division_name: z
    .string()
    .min(1, "Harus diisi")
    .max(150, "Maksimal 150 karakter")
    .trim(),
  division_status: z.enum(["active", "inactive"]),
});

export type DivisionFormSchema = z.infer<typeof formSchema>;

export default function DivisionForm() {
  // Hooks
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  // RTK Query
  const [showDivision, { isLoading: showIsLoading }] =
    useLazyBusinessDivisionShowQuery();

  const [storeDivision, { isLoading: storeIsLoading }] =
    useBusinessDivisionStoreMutation();

  const [updateDivision, { isLoading: updateIsLoading }] =
    useBusinessDivisionUpdateMutation();

  const isLoading = showIsLoading || storeIsLoading || updateIsLoading;

  // States
  const [initialValues, setInitialValues] = useState<DivisionFormSchema>({
    division_name: "",
    division_status: "active",
  });

  useEffect(() => {
    if (id) detailDivision(id);
  }, [id]);

  const detailDivision = async (id: string) => {
    await showDivision(id)
      .unwrap()
      .then((division) => {
        setInitialValues({
          division_name: division.division_name,
          division_status: division.division_status,
        });
      })
      .catch((rejected: { message?: string; data?: ApiResponse<unknown> }) => {
        toastError(
          rejected?.data?.message || "Terjadi kesalahan ketika mengambil data"
        );
        closeModal();
      });
  };

  const onSubmit = async (values: DivisionFormSchema) => {
    if (!id) {
      await storeDivision(values)
        .unwrap()
        .then((response) => {
          toastSuccess(response?.message || "Divisi berhasil ditambahkan");
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
      await updateDivision({ id, payload: values })
        .unwrap()
        .then((response) => {
          toastSuccess(response?.message || "Divisi berhasil diubah");
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
                  <DialogTitle>{id ? "Ubah" : "Tambah"} Divisi</DialogTitle>
                  <div className="pt-8">
                    <FormikInput
                      required
                      aria-autocomplete="none"
                      label="Nama Divisi"
                      name="division_name"
                      id="division_name"
                      placeholder="Nama Divisi"
                    />
                    <div className="mt-7 flex flex-col space-y-5">
                      <Label>Aktif</Label>
                      <Switch
                        checked={formik.values.division_status === "active"}
                        onCheckedChange={(checked) => {
                          formik.setFieldTouched("division_status", true);
                          formik.setFieldValue(
                            "division_status",
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
