import { Button, FormikInput } from "paperwork-ui";
import { toastError, toastSuccess } from "@/components/ui/toast";
import { useUserSecurityChangePasswordMutation } from "@/redux/api/superadmin/manage-user/security-api";
import { Form, Formik, FormikHelpers } from "formik";
import { withZodSchema } from "formik-validator-zod";
import { LucideKey, LucideLoader2 } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { z } from "zod";

export const securityChangePasswordSchema = z
  .object({
    user_new_password: z.string({ required_error: "Harus diisi" }).min(6, "Minimal 6 karakter"),
    user_new_password_confirmation: z.string({
      required_error: "Harus diisi",
    }),
  })
  .refine((data) => data.user_new_password === data.user_new_password_confirmation, {
    message: "Kata sandi tidak cocok",
    path: ["user_new_password_confirmation"],
  });

export type SecurityChangePasswordSchemaType = z.infer<typeof securityChangePasswordSchema>;

export default function SecurityTabIndex() {
  // Hooks
  const { id } = useParams();

  // RTK Query
  const [securityChangePassword, { isLoading }] = useUserSecurityChangePasswordMutation();

  const [initialValues] = useState<SecurityChangePasswordSchemaType>({
    user_new_password: "",
    user_new_password_confirmation: "",
  });

  const onSubmit = async (values: SecurityChangePasswordSchemaType, formikHelpers: FormikHelpers<SecurityChangePasswordSchemaType>) => {
    await securityChangePassword({ user_id: id, payload: values })
      .unwrap()
      .then(
        (response) => {
          formikHelpers.resetForm();
          toastSuccess(response.message || "Kata sandi berhasil diubah");
        },
        (rejected: { status: number; data?: ApiResponse<user> }) => {
          const message = rejected.data?.message;

          if (rejected.status === 422 && rejected.data) {
            formikHelpers.setErrors(rejected.data?.errors as any);
          }

          toastError(message || "Terjadi kesalahan ketika menyimpan data");
        }
      );
  };

  return (
    <div className="py-2">
      <div className="rounded-md shadow bg-card">
        <div className="flex items-center justify-between p-5 py-6 border-b">
          <div className="flex items-center font-semibold">
            <LucideKey className="w-4 h-4 mr-2" /> Keamanan
          </div>
        </div>
        <div className="p-5">
          <div className="lg:max-w-2xl">
            <h2 className="mt-2 mb-12 text-xl font-bold tracking-tight">Ubah Kata Sandi</h2>

            <Formik initialValues={initialValues} validate={withZodSchema(securityChangePasswordSchema)} onSubmit={onSubmit} enableReinitialize={true}>
              {({ dirty, isValid }) => (
                <Form className="flex flex-col space-y-7" autoComplete="off">
                  <FormikInput name="user_new_password" id="user_new_password" type="password" placeholder="Kata Sandi Baru" label="Kata Sandi Baru" required />
                  <FormikInput
                    name="user_new_password_confirmation"
                    id="user_new_password_confirmation"
                    type="password"
                    placeholder="Ulangi Kata Sandi Baru"
                    label="Ulangi Kata Sandi Baru"
                    required
                  />

                  <div className="flex justify-start pt-8 pb-2">
                    <Button type="submit" disabled={isLoading || !(dirty && isValid)}>
                      {isLoading && <LucideLoader2 className="w-4 h-4 mr-2 animate-spin" />}
                      {isLoading ? "Mohon Tunggu" : "Simpan Perubahan"}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
