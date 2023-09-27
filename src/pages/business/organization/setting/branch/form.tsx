import { FormikInput } from "@/components/formik";
import { toastError, toastSuccess } from "@/components/ui/toast";
import {
  useBusinessBranchStoreMutation,
  useBusinessBranchUpdateMutation,
  useLazyBusinessBranchShowQuery,
} from "@/redux/api/business/branch-api";
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
  branch_name: z
    .string()
    .min(1, "Harus diisi")
    .max(150, "Maksimal 150 karakter")
    .trim(),
  branch_status: z.enum(["active", "inactive"]),
});

export type BranchFormSchema = z.infer<typeof formSchema>;

export default function BranchForm() {
  // Hooks
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  // RTK Query
  const [showBranch, { isLoading: showIsLoading }] =
    useLazyBusinessBranchShowQuery();

  const [storeBranch, { isLoading: storeIsLoading }] =
    useBusinessBranchStoreMutation();

  const [updateBranch, { isLoading: updateIsLoading }] =
    useBusinessBranchUpdateMutation();

  const isLoading = showIsLoading || storeIsLoading || updateIsLoading;

  // States
  const [initialValues, setInitialValues] = useState<BranchFormSchema>({
    branch_name: "",
    branch_status: "active",
  });

  useEffect(() => {
    if (id) detailBranch(id);
  }, [id]);

  const detailBranch = async (id: string) => {
    await showBranch(id)
      .unwrap()
      .then((branch) => {
        setInitialValues({
          branch_name: branch.branch_name,
          branch_status: branch.branch_status,
        });
      })
      .catch((rejected: { message?: string; data?: ApiResponse<unknown> }) => {
        toastError(
          rejected?.data?.message || "Terjadi kesalahan ketika mengambil data"
        );
        closeModal();
      });
  };

  const onSubmit = async (values: BranchFormSchema) => {
    if (!id) {
      await storeBranch(values)
        .unwrap()
        .then((response) => {
          toastSuccess(response?.message || "Cabang berhasil ditambahkan");
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
      await updateBranch({ id, payload: values })
        .unwrap()
        .then((response) => {
          toastSuccess(response?.message || "Cabang berhasil diubah");
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
                  <DialogTitle>{id ? "Ubah" : "Tambah"} Cabang</DialogTitle>
                  <div className="pt-8">
                    <FormikInput
                      required
                      aria-autocomplete="none"
                      label="Nama Cabang"
                      name="branch_name"
                      id="branch_name"
                      placeholder="Nama Cabang"
                    />
                    <div className="mt-7 flex flex-col space-y-5">
                      <Label>Aktif</Label>
                      <Switch
                        checked={formik.values.branch_status === "active"}
                        onCheckedChange={(checked) => {
                          formik.setFieldTouched("branch_status", true);
                          formik.setFieldValue(
                            "branch_status",
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
