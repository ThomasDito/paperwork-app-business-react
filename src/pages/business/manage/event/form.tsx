import { FormikDatePicker, FormikInput } from "@/components/formik";
import { FormikTextarea } from "@/components/formik/textarea";
import { toastError, toastSuccess } from "@/components/ui/toast";
import {
  useBusinessEventStoreMutation,
  useBusinessEventUpdateMutation,
  useLazyBusinessEventShowQuery,
} from "@/redux/api/business/business/event-api";
import { Form, Formik, FormikHelpers } from "formik";
import { withZodSchema } from "formik-validator-zod";
import { LucideLoader2 } from "lucide-react";
import moment from "moment-timezone";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Switch,
} from "paperwork-ui";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

const formSchema = z.object({
  event_name: z
    .string()
    .trim()
    .min(1, "Harus diisi")
    .max(150, "Maksimal 150 karakter"),
  event_description: z
    .string()
    .trim()
    .min(1, "Harus diisi")
    .max(150, "Maksimal 150 karakter")
    .nullish()
    .or(z.literal("")),
  event_location: z
    .string()
    .trim()
    .min(1, "Harus diisi")
    .max(150, "Maksimal 150 karakter")
    .nullish()
    .or(z.literal("")),
  event_start_date: z.date({ coerce: true }),
  event_end_date: z.date({ coerce: true }),
  event_is_national_holiday: z.boolean(),
  event_is_company_holiday: z.boolean(),
});

export type EventFormSchema = z.infer<typeof formSchema>;

export default function EventForm() {
  // Hooks
  const navigate = useNavigate();
  const location = useLocation();
  const { id, start, end } = useParams();

  // RTK Query
  const [showEvent, { isLoading: showIsLoading }] =
    useLazyBusinessEventShowQuery();

  const [storeEvent, { isLoading: storeIsLoading }] =
    useBusinessEventStoreMutation();

  const [updateEvent, { isLoading: updateIsLoading }] =
    useBusinessEventUpdateMutation();

  const isLoading = showIsLoading || storeIsLoading || updateIsLoading;

  // States
  const [initialValues, setInitialValues] = useState<EventFormSchema>({
    event_name: "",
    event_description: "",
    event_location: "",
    event_start_date: start ? moment(start).toDate() : moment().toDate(),
    event_end_date: end ? moment(end).toDate() : moment().toDate(),
    event_is_national_holiday: false,
    event_is_company_holiday: false,
  });

  useEffect(() => {
    if (id) detailEvent(id);
  }, [id]);

  const detailEvent = async (id: string) => {
    await showEvent(id)
      .unwrap()
      .then((event) => {
        setInitialValues({
          event_name: event.event_name,
          event_description: event.event_description ?? "",
          event_location: event.event_location ?? "",
          event_start_date: moment(event.event_start_date).toDate(),
          event_end_date: moment(event.event_end_date).toDate(),
          event_is_company_holiday: event.event_is_company_holiday,
          event_is_national_holiday: event.event_is_national_holiday,
        });
      })
      .catch((rejected: { status?: number; data?: ApiResponse<unknown> }) => {
        toastError(
          rejected?.data?.message || "Terjadi kesalahan ketika mengambil data"
        );
        closeModal();
      });
  };

  const onSubmit = async (
    values: EventFormSchema,
    formikHelpers: FormikHelpers<EventFormSchema>
  ) => {
    const payload = {
      ...values,
      event_description: values.event_description || null,
      event_location: values.event_location || null,
    };

    if (!id) {
      await storeEvent(payload)
        .unwrap()
        .then((response) => {
          toastSuccess(response?.message || "Acara berhasil ditambahkan");
          closeModal();
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
      await updateEvent({ id, payload })
        .unwrap()
        .then((response) => {
          toastSuccess(response?.message || "Acara berhasil diubah");
          closeModal();
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
                {showIsLoading ? (
                  <div className="flex flex-1 justify-center">
                    <LucideLoader2 className="m-10 w-16 h-16 text-primary animate-spin" />
                  </div>
                ) : (
                  <>
                    <DialogHeader>
                      <DialogTitle className="pb-3">
                        {id ? "Ubah" : "Tambah"} Acara
                      </DialogTitle>
                      <div className="pt-5 border-t rounded-b-md bg-card space-y-5">
                        <FormikInput
                          required
                          label="Nama Acara"
                          name="event_name"
                          id="event_name"
                          placeholder="Nama Acara"
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <FormikDatePicker
                            required
                            label="Tanggal Mulai"
                            name="event_start_date"
                            id="event_start_date"
                            placeholder="Tanggal Mulai"
                            className="flex w-full"
                          />

                          <FormikDatePicker
                            required
                            label="Tanggal Berakhir"
                            name="event_end_date"
                            id="event_end_date"
                            placeholder="Tanggal Berakhir"
                            className="flex w-full"
                          />
                        </div>
                        <div className="flex items-center space-x-4 pt-3">
                          <Switch
                            name="event_is_national_holiday"
                            checked={formik.values.event_is_national_holiday}
                            onCheckedChange={(checked) =>
                              formik.setFieldValue(
                                "event_is_national_holiday",
                                checked
                              )
                            }
                          />
                          <div className="text-sm font-medium">
                            Hari Libur Nasional
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 pb-3">
                          <Switch
                            name="event_is_company_holiday"
                            checked={formik.values.event_is_company_holiday}
                            onCheckedChange={(checked) =>
                              formik.setFieldValue(
                                "event_is_company_holiday",
                                checked
                              )
                            }
                          />
                          <div className="text-sm font-medium">
                            Hari Libur Perusahaan
                          </div>
                        </div>
                        <FormikInput
                          label="Lokasi Acara"
                          name="event_location"
                          id="event_location"
                          placeholder="Lokasi Acara"
                        />
                        <FormikTextarea
                          label="Deskripsi Acara"
                          name="event_description"
                          id="event_description"
                          placeholder="Deskripsi Acara"
                          rows={5}
                        />
                      </div>
                    </DialogHeader>
                    <DialogFooter className="pt-3">
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
                        disabled={
                          isLoading || !(formik.dirty && formik.isValid)
                        }
                        onClick={() => formik.submitForm()}
                      >
                        {isLoading ? (
                          <LucideLoader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          "Simpan"
                        )}
                      </Button>
                    </DialogFooter>
                  </>
                )}
              </DialogContent>
            </Dialog>
          </Form>
        );
      }}
    </Formik>
  );
}
