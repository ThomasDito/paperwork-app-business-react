import { Form, Formik } from "formik";
import { withZodSchema } from "formik-validator-zod";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { login, selectMe } from "@/redux/slices/auth-slice";
import { useProfileUpdateMutation } from "@/redux/api/profile-api";
import { toastError, toastSuccess } from "@/components/ui/toast";
import moment from "moment";
import { Avatar, AvatarFallback, AvatarImage, Button, Label, SelectItem, Separator, FormikInput, FormikSelect, FormikDatePicker } from "paperwork-ui";

export default function ProfileIndex() {
  const dispatch = useAppDispatch();
  const me = useAppSelector(selectMe);

  const [profileUpdate, { isLoading }] = useProfileUpdateMutation();

  const [_, setSelectedAvatar] = useState<File>();
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);

  const selectAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files as FileList;

    if (selectedFiles?.[0]) {
      setSelectedAvatar(selectedFiles?.[0]);
      setPreviewAvatar(URL.createObjectURL(selectedFiles?.[0]));
    }
  };

  const formSchema = z.object({
    user_fullname: z.string().min(1, "Harus diisi").max(150, "Maksimal 150 karakter").trim(),
    user_email: z.string().email("Email tidak valid").max(150, "Maksimal 150 karakter").trim(),
    user_birthdate: z.date().nullable().optional(),
    user_address: z.string().max(150, "Maksimal 150 karakter").trim().nullable().optional(),
    user_phone: z.string().regex(new RegExp("^(^\\+62|62|^08)(\\d{3,4}-?){2}\\d{3,4}$"), "Nomor telepon tidak valid").nullable().optional().or(z.literal("")),
    user_gender: z.enum(["male", "female"]).nullable().optional().or(z.literal("")),
  });

  type formSchemaType = z.infer<typeof formSchema>;

  const [initialValues, setInitialValues] = useState<formSchemaType>({
    user_fullname: "",
    user_email: "",
    user_address: "",
    user_gender: "",
    user_phone: "",
    user_birthdate: null,
  });

  useEffect(() => {
    if (me) {
      setInitialValues({
        user_fullname: me.user_fullname ?? "",
        user_email: me.user_email ?? "",
        user_gender: (me.user_gender as any) ?? null,
        user_phone: me.user_phone ?? "",
        user_address: me.user_address ?? "",
        user_birthdate: me.user_birthdate ? moment(me.user_birthdate).utc(true).toDate() : null,
      });

      setPreviewAvatar(me.user_avatar ?? null);
    }
  }, [me]);

  const onSubmit = async (values: formSchemaType) => {
    const payload = { ...values };
    payload.user_address = payload.user_address ?? null;
    payload.user_birthdate = payload.user_birthdate ? moment(payload.user_birthdate).utc(true).toDate() : null;
    payload.user_gender = payload.user_gender ?? null;
    payload.user_phone = payload.user_phone ?? null;

    await profileUpdate(payload)
      .unwrap()
      .then(
        (result) => {
          dispatch(login(result));
          toastSuccess("Profil berhasil disimpan");
        },
        (rejected: { message?: string }) => {
          toastError(rejected.message || "Terjadi kesalahan ketika menyimpan data");
        }
      );
  };

  return (
    <div>
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Profil</h2>
        <p className="text-muted-foreground">Kelola dan ubah informasi profil pribadi anda</p>
      </div>
      <Separator className="my-6" />

      <Formik initialValues={initialValues} validate={withZodSchema(formSchema)} onSubmit={onSubmit} enableReinitialize={true}>
        {({ dirty, isValid }) => (
          <Form className="flex flex-col space-y-7">
            <div className="space-y-2">
              <Avatar className="w-20 h-20 mb-5">
                <AvatarImage
                  src={previewAvatar ?? "https://lh3.googleusercontent.com/ogw/AGvuzYapd1lXjdQ1fAUhfzHx2OLSc4CTgORl1q0KNsIICw=s32-c-mo"}
                  alt={"avatar"}
                />
                <AvatarFallback></AvatarFallback>
              </Avatar>
              <Label htmlFor="user_avatar">Foto</Label>
              <FormikInput
                type="file"
                name="user_avatar"
                //
                placeholder="Pilih Foto Profil"
                onChange={selectAvatar}
                accept="image/*"
              />
            </div>
            <FormikInput name="user_fullname" id="user_fullname" placeholder="Nama Lengkap" label="Nama Lengkap" />
            <FormikInput name="user_email" id="user_email" required type="email" placeholder="Alamat Email" label="Email" />
            <FormikInput name="user_phone" id="user_phone" placeholder="Nomor Telepon" label="Nomor Telepon" />
            <FormikSelect name="user_gender" id="user_gender" placeholder="Pilih Jenis Kelamin" label="Jenis Kelamin">
              <SelectItem value="male">Laki-laki</SelectItem>
              <SelectItem value="female">Perempuan</SelectItem>
            </FormikSelect>
            <FormikInput name="user_address" id="user_address" placeholder="Alamat" label="Alamat" />
            <FormikDatePicker name="user_birthdate" id="user_birthdate" placeholder="Pilih Tanggal" label="Tanggal Lahir" />

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
