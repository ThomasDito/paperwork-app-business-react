import { FormikInput } from "@/components/formik";
import { toastError, toastSuccess } from "@/components/ui/toast";
import { useBusinessMemberStoreMutation } from "@/redux/api/business/business/member-api";
import { Form, Formik } from "formik";
import { withZodSchema } from "formik-validator-zod";
import { LucideLoader2, LucideSave } from "lucide-react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "paperwork-ui";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";

const formSchema = z.object({
  user_email: z
    .string()
    .trim()
    .email("Email tidak valid")
    .min(1, "Harus diisi")
    .max(150, "Maksimal 150 karakter"),
  user_fullname: z
    .string()
    .trim()
    .min(1, "Harus diisi")
    .max(150, "Maksimal 150 karakter"),
});

export type MemberCreateSchema = z.infer<typeof formSchema>;

export default function MemberCreate() {
  // Hooks
  const navigate = useNavigate();
  const location = useLocation();

  // RTK Query
  const [storeMember, { isLoading: storeIsLoading }] =
    useBusinessMemberStoreMutation();

  const isLoading = storeIsLoading;

  // States
  const [initialValues] = useState<MemberCreateSchema>({
    user_fullname: "",
    user_email: "",
  });

  const onSubmit = async (values: MemberCreateSchema) => {
    await storeMember(values)
      .unwrap()
      .then((response) => {
        toastSuccess(
          response?.message ||
            "Link verifikasi berhasil dikirim ke email anggota"
        );
        closeModal();
      })
      .catch((rejected: { message?: string; data?: ApiResponse<unknown> }) => {
        toastError(
          rejected?.data?.message ||
            "Terjadi kesalahan ketika menambahkan anggota"
        );
      });
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
          <Dialog open={true} onOpenChange={() => closeModal()}>
            <DialogContent>
              <Form>
                <DialogHeader>
                  <DialogTitle>Buat Anggota Baru</DialogTitle>
                  <div className="pt-8 space-y-4">
                    <FormikInput
                      required
                      aria-autocomplete="none"
                      label="Nama Lengkap"
                      name="user_fullname"
                      id="user_fullname"
                      placeholder="Nama Lengkap"
                    />
                    <FormikInput
                      required
                      aria-autocomplete="none"
                      label="Alamat Email"
                      name="user_email"
                      id="user_email"
                      placeholder="Alamat Email"
                      type="email"
                    />
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
                  >
                    {isLoading ? (
                      <LucideLoader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <div className="flex items-center">
                        <LucideSave className="w-5 h-5 mr-2" />
                        Simpan
                      </div>
                    )}
                  </Button>
                </DialogFooter>
              </Form>
            </DialogContent>
          </Dialog>
        );
      }}
    </Formik>
  );
}
