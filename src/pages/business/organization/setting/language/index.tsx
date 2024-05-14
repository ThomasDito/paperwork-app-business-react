import { FormikSelect } from "@/components/formik";
import useRole from "@/hooks/useRole";
import { useBusinessOrganizationUpdateMutation } from "@/redux/api/business/business/organization-api";
import { useAppSelector } from "@/redux/hooks";
import { selectOrganization } from "@/redux/slices/auth-slice";
import { Form, Formik, FormikHelpers } from "formik";
import { withZodSchema } from "formik-validator-zod";
import { LucideLoader2, LucideSave } from "lucide-react";
import { Button, SelectItem, toastError, toastSuccess } from "paperwork-ui";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Organization } from "../../../../../../../paperwork-utils/dist";
import { Link } from "react-router-dom"; // import untuk Link

export default function LanguageSetting() {
  // Schema
  const formSchema = z.object({
    organization_language: z.enum(["id", "en", ""], {
      errorMap: () => ({ message: "Tidak valid" }),
    }),
  });

  type FormSchema = z.infer<typeof formSchema>;

  // RTK Query
  const [save, { isLoading }] = useBusinessOrganizationUpdateMutation();

  // Hooks
  const organization = useAppSelector(selectOrganization);
  const canWrite = useRole("organization_setting", "write");

  // States
  const [initialValues, setInitialValues] = useState<FormSchema>({
    organization_language: "",
  });

  useEffect(() => {
    if (organization) {
      setInitialValues({
        organization_language: organization.organization_language || "",
      });
    }
  }, [organization]);

  // Actions
  async function onSubmit(
    values: FormSchema,
    formikHelpers: FormikHelpers<FormSchema>
  ) {
    const formData = new FormData();
    formData.append("organization_language", values.organization_language);

    await save(formData as unknown as Organization)
      .unwrap()
      .then((response) => {
        toastSuccess(response?.message || "Pengaturan berhasil disimpan");
      })
      .catch((rejected: { status: number; data?: ApiResponse<unknown> }) => {
        const message = rejected.data?.message;

        if (rejected.status === 422 && rejected.data?.errors) {
          formikHelpers.setErrors(
            rejected.data.errors as unknown as Record<string, string>
          );
        }
        toastError(message || "Terjadi kesalahan ketika menyimpan data");
      });
  }

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="text-sm font-medium mb-4" aria-label="Breadcrumb">
        <ol className="flex">
          <li className="flex items-center">
            <Link to="/" className="text-gray-400 hover:text-gray-500">
              Home
            </Link>
            <svg
              className="flex-shrink-0 w-3 h-3 mx-2 fill-current text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M7.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L10.586 11H3a1 1 0 110-2h7.586L7.293 6.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </li>
          <li className="flex items-center">
            <Link to="/business/organization/setting/language" className="text-gray-400 hover:text-gray-500">
              Organisasi
            </Link>
            <svg
              className="flex-shrink-0 w-3 h-3 mx-2 fill-current text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M7.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L10.586 11H3a1 1 0 110-2h7.586L7.293 6.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </li>
          <li className="flex items-center">
            <Link to="/business/organization/setting/organization" className="text-gray-400 hover:text-gray-500">
              Pengaturan
            </Link>
            <svg
              className="flex-shrink-0 w-3 h-3 mx-2 fill-current text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M7.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L10.586 11H3a1 1 0 110-2h7.586L7.293 6.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </li>
          <li className="flex items-center">
            <span className="text-gray-500">Bahasa</span>
          </li>
        </ol>
      </nav>

      {/* Form Bahasa */}
      <Formik
      initialValues={initialValues}
      validate={withZodSchema(formSchema)}
      onSubmit={onSubmit}
      enableReinitialize
      >
        {(formik) => {
          return (
            <Form>
              <div className="shadow-sm rounded-md bg-card">
                <div className="p-5 py-6 flex flex-col items-center justify-between space-y-6 border-0 md:space-y-0 md:flex-row border-b">
                  <h3 className="text-2xl font-semibold tracking-tight scroll-m-20">
                    Bahasa
                  </h3>
                </div>
                <div className="p-5 space-y-5">
                  <FormikSelect
                    className="w-full lg:w-[300px]"
                    name="organization_language"
                    label="Bahasa"
                    placeholder="Pilih Bahasa"
                    disabled={isLoading}
                  >
                    <SelectItem value="">Otomatis</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="id">Indonesia</SelectItem>
                  </FormikSelect>

                  {formik.values.organization_language === "" && (
                    <div className="mt-5 p-3 py-4 text-sm bg-amber-50 border border-amber-200 rounded-lg">
                      Bahasa diatur sesuai dengan bahasa yang digunakan oleh
                      perangkat atau preferensi dari setiap anggota
                    </div>
                  )}
                </div>
                {canWrite && (
                  <div className="flex justify-end p-5 border-t">
                    <Button disabled={isLoading} type="submit">
                      {isLoading ? (
                        <>
                          <LucideLoader2 className="w-5 h-5 mr-2 animate-spin" />{" "}
                          Menyimpan
                        </>
                      ) : (
                        <>
                          <LucideSave className="w-5 h-5 mr-2" /> Simpan
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
