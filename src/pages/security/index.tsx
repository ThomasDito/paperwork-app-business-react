import { Form, Formik, FormikHelpers } from "formik";
import { withZodSchema } from "formik-validator-zod";
import { useState } from "react";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { toastError, toastSuccess } from "@/components/ui/toast";
import { useSecurityChangePasswordMutation } from "@/redux/api/security-api";
import { Button, Separator, FormikInput } from "paperwork-ui";

export default function SecurityIndex() {
  const [securityChangePassword, { isLoading }] = useSecurityChangePasswordMutation();

  const formSchema = z
    .object({
      user_password: z.string({ required_error: "Harus diisi" }).min(1, "Harus diisi"),
      user_new_password: z.string({ required_error: "Harus diisi" }).min(6, "Minimal 6 karakter"),
      user_new_password_confirmation: z.string({
        required_error: "Harus diisi",
      }),
    })
    .refine((data) => data.user_new_password === data.user_new_password_confirmation, {
      message: "Kata sandi tidak cocok",
      path: ["user_new_password_confirmation"],
    });

  type formSchemaType = z.infer<typeof formSchema>;

  const [initialValues] = useState<formSchemaType>({
    user_password: "",
    user_new_password: "",
    user_new_password_confirmation: "",
  });

  const onSubmit = async (values: formSchemaType, formikHelpers: FormikHelpers<formSchemaType>) => {
    await securityChangePassword(values)
      .unwrap()
      .then(
        () => {
          formikHelpers.resetForm();
          toastSuccess("Kata sandi berhasil diubah");
        },
        (rejected: { status: number; data: ApiResponse<user> }) => {
          const message = rejected.data.message;

          if (rejected.status === 422) {
            formikHelpers.setErrors(rejected.data.errors as unknown as formSchemaType);
          }

          toastError(message || "Terjadi kesalahan ketika menyimpan data");
        }
      );
  };

  return (
    <div>
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Keamanan</h2>
        <p className="text-muted-foreground">Kelola pengaturan keamanan akun anda</p>
      </div>
      <Separator className="my-6" />

      <h2 className="mb-8 text-xl font-bold tracking-tight">Kata Sandi</h2>

      <Formik initialValues={initialValues} validate={withZodSchema(formSchema)} onSubmit={onSubmit} enableReinitialize={true}>
        {({ dirty, isValid }) => (
          <Form className="flex flex-col space-y-7">
            <FormikInput name="user_new_password" id="user_new_password" type="password" placeholder="Kata Sandi Baru" label="Kata Sandi Baru" />
            <FormikInput name="user_new_password_confirmation" id="user_new_password_confirmation" type="password" placeholder="Ulangi Kata Sandi Baru" label="Ulangi Kata Sandi Baru" />
            <Separator />
            <FormikInput name="user_password" id="user_password" type="password" placeholder="Masukkan Kata Sandi Saat Ini" label="Kata Sandi Sebelumnya" />

            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading || !(dirty && isValid)}>
                {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {isLoading ? "Mohon Tunggu" : "Simpan"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
