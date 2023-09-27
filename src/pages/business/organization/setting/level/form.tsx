import { FormikInput } from "@/components/formik";
import { toastError, toastSuccess } from "@/components/ui/toast";
import {
  useBusinessLevelStoreMutation,
  useBusinessLevelUpdateMutation,
  useLazyBusinessLevelShowQuery,
} from "@/redux/api/business/level-api";
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
  level_name: z
    .string()
    .min(1, "Harus diisi")
    .max(150, "Maksimal 150 karakter")
    .trim(),
  level_status: z.enum(["active", "inactive"]),
});

export type LevelFormSchema = z.infer<typeof formSchema>;

export default function LevelForm() {
  // Hooks
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  // RTK Query
  const [showLevel, { isLoading: showIsLoading }] =
    useLazyBusinessLevelShowQuery();

  const [storeLevel, { isLoading: storeIsLoading }] =
    useBusinessLevelStoreMutation();

  const [updateLevel, { isLoading: updateIsLoading }] =
    useBusinessLevelUpdateMutation();

  const isLoading = showIsLoading || storeIsLoading || updateIsLoading;

  // States
  const [initialValues, setInitialValues] = useState<LevelFormSchema>({
    level_name: "",
    level_status: "active",
  });

  useEffect(() => {
    if (id) detailLevel(id);
  }, [id]);

  const detailLevel = async (id: string) => {
    await showLevel(id)
      .unwrap()
      .then((level) => {
        setInitialValues({
          level_name: level.level_name,
          level_status: level.level_status,
        });
      })
      .catch((rejected: { message?: string; data?: ApiResponse<unknown> }) => {
        toastError(
          rejected?.data?.message || "Terjadi kesalahan ketika mengambil data"
        );
        closeModal();
      });
  };

  const onSubmit = async (values: LevelFormSchema) => {
    if (!id) {
      await storeLevel(values)
        .unwrap()
        .then((response) => {
          toastSuccess(response?.message || "Level berhasil ditambahkan");
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
      await updateLevel({ id, payload: values })
        .unwrap()
        .then((response) => {
          toastSuccess(response?.message || "Level berhasil diubah");
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
                  <DialogTitle>{id ? "Ubah" : "Tambah"} Level</DialogTitle>
                  <div className="pt-8">
                    <FormikInput
                      required
                      aria-autocomplete="none"
                      label="Nama Level"
                      name="level_name"
                      id="level_name"
                      placeholder="Nama Level"
                    />
                    <div className="mt-7 flex flex-col space-y-5">
                      <Label>Aktif</Label>
                      <Switch
                        checked={formik.values.level_status === "active"}
                        onCheckedChange={(checked) => {
                          formik.setFieldTouched("level_status", true);
                          formik.setFieldValue(
                            "level_status",
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
