import { Label, Button } from "paperwork-ui";
import { Form, Formik, FormikHelpers } from "formik";
import { withZodSchema } from "formik-validator-zod";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { Loader2, LucideEdit, LucideUser, LucideX, Trash, Upload } from "lucide-react";
import { toastError, toastSuccess } from "@/components/ui/toast";
import moment from "moment";
import { useShowUserQuery, useUpdateUserMutation } from "@/redux/api/superadmin/manage-user/user-api";
import SelectRegion from "@/pages/user/components/select-region";
import { useParams } from "react-router-dom";
import ErrorPage from "@/components/error-page";
import LoadingPage from "@/components/loading-page";
import { SelectItem, cn, FormikInput, FormikSelect, FormikDatePicker } from "paperwork-ui";

const MAX_FILE_SIZE = 1024 * 3; //3MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const profileUpdateSchema = z
  .object({
    user_fullname: z.string().min(1, "Harus diisi").max(150, "Maksimal 150 karakter").trim(),
    user_email: z.string().email("Email tidak valid").max(150, "Maksimal 150 karakter").trim(),
    user_birthdate: z.date().nullable().optional(),
    user_address: z.string().max(150, "Maksimal 150 karakter").trim().nullable().optional(),
    user_phone: z.string().regex(new RegExp("^(^\\+62|62|^08)(\\d{3,4}-?){2}\\d{3,4}$"), "Nomor telepon tidak valid").nullable().optional().or(z.literal("")),
    user_gender: z.enum(["male", "female"]).nullable().optional().or(z.literal("")),
    province_id: z.string().trim().nullish(),
    city_id: z.string().trim().nullish(),
    user_avatar: z
      .instanceof(File)
      .nullish()
      .refine((file) => !file || (file && file?.size / 1024 <= MAX_FILE_SIZE), `Maksimal ukuran file adalah 3 MB.`)
      .refine((file) => !file || (file && ACCEPTED_IMAGE_TYPES.includes(file?.type)), "Hanya diperbolehkan file berformat .jpg, .jpeg, .png dan .webp"),
    delete_avatar: z.boolean().nullish(),
  })
  .refine((data) => !data.province_id || (data.province_id && data.city_id), {
    message: "Harus dipilih",
    path: ["city_id"],
  });

export type ProfileUpdateSchemaType = z.infer<typeof profileUpdateSchema>;

export default function UserTabIndex() {
  // Hooks
  const { id } = useParams();

  // RTK Query
  const { data: user, isFetching, isLoading, error } = useShowUserQuery(id);

  const [updateUser, { isLoading: updateUserIsLoading }] = useUpdateUserMutation();

  // States

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const refAvatar = useRef<HTMLInputElement | null>(null);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);

  const previewImage = (image: Blob | null): void => {
    if (!image) return;
    setPreviewAvatar(URL.createObjectURL(image));
  };

  const [initialValues, setInitialValues] = useState<ProfileUpdateSchemaType>({
    user_fullname: "",
    user_email: "",
    user_address: "",
    user_gender: "",
    user_phone: "",
    user_birthdate: null,
    city_id: "",
    province_id: "",
  });

  useEffect(() => {
    if (user) {
      setInitialValues({
        ...(user as ProfileUpdateSchemaType),
        user_birthdate: user.user_birthdate ? moment(user.user_birthdate).toDate() : null,
        user_avatar: undefined,
      });

      setPreviewAvatar(user.user_avatar || null);
    }
  }, [user]);

  const onSubmit = async (values: ProfileUpdateSchemaType, formikHelpers: FormikHelpers<ProfileUpdateSchemaType>) => {
    const payload = new FormData();

    payload.append("user_fullname", values.user_fullname);
    payload.append("user_email", values.user_email);

    if (values.user_address) payload.append("user_address", values.user_address);
    if (values.user_gender) payload.append("user_gender", values.user_gender);
    if (values.user_phone) payload.append("user_phone", values.user_phone);

    if (values.user_birthdate) {
      payload.append("user_birthdate", moment(values.user_birthdate).utc(true).format("YYYY-MM-DD"));
    }

    if (values.province_id && values.city_id) {
      payload.append("province_id", values.province_id);
      payload.append("city_id", values.city_id);
    }

    if (typeof values.user_avatar != "undefined") {
      if (values.user_avatar) {
        payload.append("user_avatar", values.user_avatar);
      } else {
        payload.append("delete_avatar", "true");
      }
    }

    await updateUser({
      id,
      payload: payload as unknown as ProfileUpdateSchemaType,
    })
      .unwrap()
      .then(
        (response) => {
          toastSuccess(response?.message || "Data pengguna berhasil disimpan");
          setIsEdit(false);
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

  if (error) {
    const { data } = error as { data: ApiResponse<unknown> };
    const message = data?.message || "Terjadi kesalahan teknis. Silahkan coba kembali";

    return <ErrorPage message={message} />;
  }

  if (isLoading || isFetching || !user) return <LoadingPage />;

  return (
    <div className="py-2">
      <div className="rounded-md shadow bg-card">
        <div className="flex items-center justify-between p-5 py-4 border-b">
          <div className="flex items-center font-semibold">
            <LucideUser className="w-4 h-4 mr-2" /> Data Pengguna
          </div>
          <div>
            {!isEdit ? (
              <Button variant={"default"} onClick={() => setIsEdit(true)}>
                <LucideEdit className="w-4 h-4 mr-2" /> Edit
              </Button>
            ) : (
              <Button variant={"outline"} onClick={() => setIsEdit(false)}>
                <LucideX className="w-4 h-4 mr-2" /> Batal
              </Button>
            )}
          </div>
        </div>
        <div className="p-5">
          <Formik initialValues={initialValues} validate={withZodSchema(profileUpdateSchema)} onSubmit={onSubmit} enableReinitialize={true}>
            {(props) => (
              <Form className="flex flex-col py-2 space-y-7">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-8">
                  <div className="col-span-1 lg:col-span-5 space-y-7">
                    <FormikInput readOnly={!isEdit} label="Nama Lengkap" required name="user_fullname" id="user_fullname" placeholder="Nama Lengkap" />
                    <FormikInput readOnly={!isEdit} label="Email" required name="user_email" id="user_email" type="email" placeholder="Alamat Email" />
                    <FormikInput readOnly={!isEdit} label="Nomor Telepon" name="user_phone" id="user_phone" placeholder="Nomor Telepon" />
                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                      <FormikDatePicker
                        label="Tanggal Lahir"
                        id="user_birthdate"
                        ButtonProps={{ disabled: !isEdit, className: "max-w-[none] w-full bg-card" }}
                        name="user_birthdate"
                        placeholder="Pilih Tanggal"
                      />
                      <FormikSelect
                        disabled={!isEdit}
                        label="Jenis Kelamin"
                        name="user_gender"
                        id="user_gender"
                        placeholder="Pilih Jenis Kelamin"
                        className="max-w-[none] w-full"
                      >
                        <SelectItem value="male">Laki-laki</SelectItem>
                        <SelectItem value="female">Perempuan</SelectItem>
                      </FormikSelect>
                    </div>
                  </div>
                  <div className="col-span-1 space-y-2 lg:col-span-3">
                    <input
                      ref={refAvatar}
                      type="file"
                      name="user_avatar"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        props.setFieldTouched("user_avatar", true);

                        if (e.currentTarget.files !== null) {
                          const image = e.currentTarget.files[0];
                          if (image) {
                            props.setFieldValue("user_avatar", e.currentTarget.files[0]);
                            previewImage(e.currentTarget.files[0]);
                          }
                        }
                      }}
                    />
                    <div
                      className={cn(
                        "w-full p-4 border flex-1 bg-muted/30 rounded-lg flex flex-col justify-center items-center space-y-4 relative",
                        props.touched.user_avatar && props.errors.user_avatar && "border-destructive"
                      )}
                    >
                      <div className="py-5">
                        {previewAvatar ? (
                          <img src={previewAvatar} className="object-cover bg-white rounded-full h-28 w-28" />
                        ) : (
                          <div className="object-contain border rounded-full h-28 w-28 bg-muted border-input"></div>
                        )}
                      </div>

                      <div className="items-center justify-center flex-1">
                        {isEdit && (
                          <>
                            <Button
                              type="button"
                              variant={"outline"}
                              size={"sm"}
                              onClick={() => {
                                refAvatar.current !== null ? refAvatar.current.click() : null;
                              }}
                            >
                              <Upload className="w-4 h-4 mr-2" /> Upload
                            </Button>
                            {previewAvatar && (
                              <Button
                                type="button"
                                size={"sm"}
                                variant={"outline"}
                                className="text-destructive hover:text-destructive"
                                onClick={() => {
                                  setPreviewAvatar(null);
                                  props.setFieldValue("user_avatar", null);
                                  if (refAvatar.current) refAvatar.current.value = "";
                                }}
                              >
                                <Trash className="w-4 h-4 mr-2" /> Hapus
                              </Button>
                            )}
                          </>
                        )}
                      </div>
                    </div>

                    {isEdit && (
                      <>
                        {props.touched.user_avatar && props.errors.user_avatar && (
                          <span className="mt-2 text-xs text-destructive">{props.errors.user_avatar}</span>
                        )}
                        <div className="w-full pt-1">
                          <div className="mt-2 text-xs text-muted-foreground ">- Rekomendasi resolusi gambar adalah 200 x 200</div>
                          <div className="mt-2 text-xs text-muted-foreground ">- Ukuran maksimal file adalah sebesar 3 MB</div>
                          <div className="mt-2 text-xs text-muted-foreground">- Mendukung format file : .jpg, .jpeg, .png, .webp</div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <FormikInput readOnly={!isEdit} label="Alamat" id="user_address" name="user_address" placeholder="Alamat" />
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <SelectRegion isEdit={isEdit} props={props} />
                </div>

                {isEdit && (
                  <div className="flex justify-end pt-8">
                    <Button type="submit" disabled={updateUserIsLoading || !(props.dirty && props.isValid)}>
                      {updateUserIsLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                      {updateUserIsLoading ? "Mohon Tunggu" : "Simpan Perubahan"}
                    </Button>
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
