import { FormikInput } from "@/components/formik";
import { toastError, toastSuccess } from "@/components/ui/toast";
import {
  useBusinessPositionStoreMutation,
  useBusinessPositionUpdateMutation,
  useLazyBusinessPositionShowQuery,
} from "@/redux/api/business/position-api";
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
  position_name: z
    .string()
    .min(1, "Harus diisi")
    .max(150, "Maksimal 150 karakter")
    .trim(),
  position_status: z.enum(["active", "inactive"]),
});

export type PositionFormSchema = z.infer<typeof formSchema>;

export default function PositionForm() {
  // Hooks
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  // RTK Query
  const [showPosition, { isLoading: showIsLoading }] =
    useLazyBusinessPositionShowQuery();

  const [storePosition, { isLoading: storeIsLoading }] =
    useBusinessPositionStoreMutation();

  const [updatePosition, { isLoading: updateIsLoading }] =
    useBusinessPositionUpdateMutation();

  const isLoading = showIsLoading || storeIsLoading || updateIsLoading;

  // States
  const [initialValues, setInitialValues] = useState<PositionFormSchema>({
    position_name: "",
    position_status: "active",
  });

  useEffect(() => {
    if (id) detailPosition(id);
  }, [id]);

  const detailPosition = async (id: string) => {
    await showPosition(id)
      .unwrap()
      .then((position) => {
        setInitialValues({
          position_name: position.position_name,
          position_status: position.position_status,
        });
      })
      .catch((rejected: { message?: string; data?: ApiResponse<unknown> }) => {
        toastError(
          rejected?.data?.message || "Terjadi kesalahan ketika mengambil data"
        );
        closeModal();
      });
  };

  const onSubmit = async (values: PositionFormSchema) => {
    if (!id) {
      await storePosition(values)
        .unwrap()
        .then((response) => {
          toastSuccess(response?.message || "Jabatan berhasil ditambahkan");
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
      await updatePosition({ id, payload: values })
        .unwrap()
        .then((response) => {
          toastSuccess(response?.message || "Jabatan berhasil diubah");
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
                  <DialogTitle>{id ? "Ubah" : "Tambah"} Jabatan</DialogTitle>
                  <div className="pt-8">
                    <FormikInput
                      required
                      aria-autocomplete="none"
                      label="Nama Jabatan"
                      name="position_name"
                      id="position_name"
                      placeholder="Nama Jabatan"
                    />
                    <div className="mt-7 flex flex-col space-y-5">
                      <Label>Aktif</Label>
                      <Switch
                        checked={formik.values.position_status === "active"}
                        onCheckedChange={(checked) => {
                          formik.setFieldTouched("position_status", true);
                          formik.setFieldValue(
                            "position_status",
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
