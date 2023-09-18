import { Button, Label } from "paperwork-ui";
import { FormikInput } from "@/components/ui/formik/formik-input";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { withZodSchema } from "formik-validator-zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { toastError } from "@/components/ui/toast";
import { Link } from "react-router-dom";
import apiClient from "@/lib/api";
import { AxiosError } from "axios";

type Props = {
  user: user | null;
  setUser: React.Dispatch<React.SetStateAction<user | null>>;
};

export default function RegisterIndex(props: Props) {
  const [loading, setLoading] = useState(false);

  const formSchema = z
    .object({
      user_fullname: z.string().min(1, "Harus diisi").max(100, "Maksimal 100 karakter").trim(),
      user_email: z.string().email("Email tidak valid").max(100, "Maksimal 100 karakter").trim(),
      user_password: z.string().min(6, "Minimal 6 karakter").max(100, "Maksimal 100 karakter"),
      user_password_confirmation: z.string(),
    })
    .refine((data) => data.user_password === data.user_password_confirmation, {
      message: "Kata sandi tidak cocok",
      path: ["user_password_confirmation"],
    });

  type formSchemaType = z.infer<typeof formSchema>;

  const [initialValues] = useState<formSchemaType>({
    user_fullname: "",
    user_email: "",
    user_password: "",
    user_password_confirmation: "",
  });

  const onSubmit = async (values: formSchemaType, formikHelpers: FormikHelpers<formSchemaType>) => {
    setLoading(true);

    apiClient
      .post("/auth/register", values)
      .then(async (response) => {
        const data: ApiResponse<user> = response.data;

        if (data.success) {
          try {
            await apiClient.post("/auth/login", values);
            props.setUser(data.data as user);
          } catch (error) {
            console.log(error);
            throw error;
          }
        } else {
          throw new Error();
        }
      })
      .catch((error) => {
        console.error(error);

        let errorMessage = error.message;

        if (error instanceof AxiosError && error.response) {
          const response = error.response.data as ApiResponse<user>;
          errorMessage = response.message;

          if (error.response.status == 422) {
            formikHelpers.setErrors(response.errors as unknown as formSchemaType);
          }
        }

        toastError(errorMessage || "Terjadi kesalahan teknis. Silahkan coba kembali");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col w-full max-w-md py-20">
      <div className="w-full overflow-hidden border rounded-lg shadow-md border-neutral-100">
        <div className="flex flex-col items-center justify-center px-4 py-6 pt-8 space-y-3 text-center border-b shrink-0 border-neutral-200 bg-background sm:px-16">
          <a href="/">
            <img
              alt="Logo"
              src="https://nextjs-mysql-auth.vercel.app/_next/image?url=%2Flogo.png&amp;w=32&amp;q=75"
              width="20"
              height="20"
              decoding="async"
              data-nimg="1"
              className="w-10 h-10 rounded-full"
              loading="lazy"
            />
          </a>
          <h3 className="text-xl font-semibold">Registrasi</h3>
          <p className="text-sm text-muted-foreground">Silahkan lengkapi data registrasi berikut</p>
        </div>

        <Formik initialValues={initialValues} validate={withZodSchema(formSchema)} onSubmit={onSubmit} enableReinitialize={true}>
          {({ isValid }) => (
            <Form className="flex flex-col w-full px-4 py-8 space-y-4 bg-gray-50 sm:px-8" autoComplete="off">
              <div className="space-y-2">
                <Label htmlFor="user_fullname">Nama</Label>
                <Field name="user_fullname" component={FormikInput} className="bg-background" placeholder="Nama" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="user_email">Email</Label>
                <Field name="user_email" type="email" component={FormikInput} className="bg-background" placeholder="Alamat Email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="user_password">Kata Sandi</Label>
                <Field name="user_password" type="password" component={FormikInput} className="bg-background" placeholder="Kata Sandi" />
              </div>
              <div className="pb-5 space-y-2">
                <Label htmlFor="user_password_confirmation">Ulangi Kata Sandi</Label>
                <Field name="user_password_confirmation" type="password" component={FormikInput} className="bg-background" placeholder="Ulangi Kata Sandi" />
              </div>

              <Button type="submit" disabled={loading || !isValid}>
                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {loading ? "Mohon Tunggu" : "Daftar"}
              </Button>

              <div className="pt-2 text-sm text-center text-muted-foreground">
                Sudah memiliki akun?
                <Link to={"/login"} className="ml-1 font-semibold text-primary hover:underline underline-offset-2">
                  Masuk
                </Link>{" "}
                sekarang.
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
