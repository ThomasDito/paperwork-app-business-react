import { FormikInput, FormikSelect } from "@/components/formik";
import { toastError, toastSuccess } from "@/components/ui/toast";
import { useBusinessMemberStoreMutation } from "@/redux/api/business/business/member-api";
import { Form, Formik, FormikHelpers } from "formik";
import { withZodSchema } from "formik-validator-zod";
import { LucideLoader2, LucideSave } from "lucide-react";
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
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";

const formSchema = z
  .object({
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
    set_password: z.boolean(),
    user_password: z
      .string()
      .trim()
      .min(6, "Minimal 6 karakter")
      .or(z.literal("")),
  })
  .refine((values) => !values.set_password || values.user_password, {
    path: ["user_password"],
    message: "Harus diisi",
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
    set_password: false,
    user_password: "",
  });

  const onSubmit = async (
    values: MemberCreateSchema,
    formikHelpers: FormikHelpers<MemberCreateSchema>
  ) => {
    await storeMember({
      ...values,
      user_password: values.set_password ? values.user_password : undefined,
    })
      .unwrap()
      .then(() => {
        let message;
        if (values.set_password) {
          message = "Anggota berhasil ditambahkan";
        } else {
          message = "Link verifikasi berhasil dikirim ke email anggota";
        }
        toastSuccess(message);
        closeModal();
      })
      .catch((rejected: { status: number; data?: ApiResponse<unknown> }) => {
        const message = rejected.data?.message;

        if (rejected.status === 422 && rejected.data?.errors) {
          formikHelpers.setErrors(
            rejected.data.errors as unknown as Record<string, string>
          );
        }
        toastError(message || "Terjadi kesalahan ketika menambahkan anggota");
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
                    <div className="flex space-x-4 py-2 items-center">
                      <Switch
                        checked={formik.values.set_password}
                        onCheckedChange={(checked) => {
                          formik.setFieldValue("set_password", checked);
                        }}
                      />
                      <Label>Set Kata Sandi</Label>
                    </div>
                    {formik.values.set_password && (
                      <FormikInput
                        required
                        aria-autocomplete="none"
                        label="Kata Sandi"
                        name="user_password"
                        id="user_password"
                        placeholder="Kata Sandi"
                      />
                    )}
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
