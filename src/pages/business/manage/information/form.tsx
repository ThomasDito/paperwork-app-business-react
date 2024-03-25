import { FormikDatePicker, FormikInput } from "@/components/formik";
import LoadingPage from "@/components/loading-page";
import {
  useBusinessInformationStoreMutation,
  useBusinessInformationUpdateMutation,
  useLazyBusinessInformationShowQuery,
} from "@/redux/api/business/business/information-api";
import { Form, Formik, FormikHelpers } from "formik";
import { withZodSchema } from "formik-validator-zod";
import { LucideLoader2, LucideSave } from "lucide-react";
import moment from "moment-timezone";
import { Button, buttonVariants, toastError, toastSuccess } from "paperwork-ui";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import z from "zod";
import { FormikTextarea } from "@/components/formik/textarea";

const formSchema = z.object({
  information_title: z
    .string()
    .trim()
    .min(1, "Harus diisi")
    .max(150, "Maksimal 150 karakter"),
  information_start_date: z.date({ coerce: true }),
  information_end_date: z.date({ coerce: true }),
  information_content: z.string().trim().min(1, "Harus diisi"),
});

export type InformationFormSchema = z.infer<typeof formSchema>;

export default function InformationForm() {
  // Hooks
  const navigate = useNavigate();
  const { id } = useParams();

  // RTK Query
  const [
    showInformation,
    {
      isLoading: showInformationIsLoading,
      isFetching: showInformationIsFetching,
      isError: showInformationIsError,
    },
  ] = useLazyBusinessInformationShowQuery();

  const [storeInformation, { isLoading: storeInformationIsLoading }] =
    useBusinessInformationStoreMutation();

  const [updateInformation, { isLoading: updateInformationIsLoading }] =
    useBusinessInformationUpdateMutation();

  // States
  const [initialValues, setInitialValues] = useState<InformationFormSchema>({
    information_title: "",
    information_content: "",
    information_end_date: new Date(),
    information_start_date: new Date(),
  });

  useEffect(() => {
    if (id) detailInformation(id);
  }, [id]);

  // Actions
  const detailInformation = async (id: string) => {
    await showInformation(id)
      .unwrap()
      .then((information) => {
        setInitialValues({
          information_title: information.information_title,
          information_content: information.information_content,
          information_start_date: moment(
            information.information_start_date
          ).toDate(),
          information_end_date: moment(
            information.information_end_date
          ).toDate(),
        });
      })
      .catch((rejected: { message?: string; data?: ApiResponse<unknown> }) => {
        console.log(rejected);
        toastError(
          rejected?.data?.message || "Terjadi kesalahan ketika mengambil data"
        );
      });
  };

  const onSubmit = async (
    values: InformationFormSchema,
    formikHelpers: FormikHelpers<InformationFormSchema>
  ) => {
    const payload: InformationFormSchema = { ...values };

    if (!id) {
      await storeInformation(payload)
        .unwrap()
        .then((response) => {
          toastSuccess(response?.message || "Pengumuman berhasil ditambahkan");
          navigate(`/business/manage/information`);
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
    } else {
      await updateInformation({ id, payload })
        .unwrap()
        .then((response) => {
          toastSuccess(response?.message || "Pengumuman berhasil disimpan");
          navigate(`/business/manage/information`);
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
  };

  if (
    showInformationIsLoading ||
    showInformationIsFetching ||
    showInformationIsError
  ) {
    return <LoadingPage />;
  }

  return (
    <Formik
      initialValues={initialValues}
      validate={withZodSchema(formSchema)}
      onSubmit={onSubmit}
      enableReinitialize={true}
    >
      {() => {
        return (
          <Form>
            <div className="bg-card border rounded-md max-w-4xl mx-auto">
              <div className="p-5 flex flex-col items-center justify-between space-y-6 border-0 md:space-y-0 md:flex-row">
                <h3 className="text-2xl font-semibold tracking-tight scroll-m-20">
                  {id ? "Ubah" : "Tambah"} Pengumuman
                </h3>
              </div>
              <div className="border-t rounded-b-md bg-card p-5 space-y-7">
                <FormikInput
                  required
                  label="Judul Pengumuman"
                  name="information_title"
                  id="information_title"
                  placeholder="Judul Pengumuman"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormikDatePicker
                    required
                    label="Tanggal Tayang"
                    name="information_start_date"
                    id="information_start_date"
                    placeholder="Tanggal Tayang"
                    className="flex w-full"
                  />

                  <FormikDatePicker
                    required
                    label="Tanggal Berakhir"
                    name="information_end_date"
                    id="information_end_date"
                    placeholder="Tanggal Berakhir"
                    className="flex w-full"
                  />
                </div>
                <FormikTextarea
                  required
                  label="Isi Pengumuman"
                  name="information_content"
                  id="information_content"
                  placeholder="Isi Pengumuman"
                  rows={15}
                />
              </div>
              <div className="flex justify-end space-x-5 p-5 border-t">
                <Link
                  to={`/business/manage/information`}
                  className={buttonVariants({ variant: "outline" })}
                >
                  Batal
                </Link>
                <Button
                  disabled={
                    storeInformationIsLoading || updateInformationIsLoading
                  }
                  type="submit"
                  className="flex items-center"
                >
                  {storeInformationIsLoading || updateInformationIsLoading ? (
                    <>
                      <LucideLoader2 className="w-5 h-5 mr-2 animate-spin" />
                      Mohon Tunggu
                    </>
                  ) : (
                    <>
                      <LucideSave className="w-5 h-5 mr-2" />
                      Simpan
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
