import {
  FormikDatePicker,
  FormikInput,
  FormikSelect,
} from "@/components/formik";
import {
  EmployeeFormSchema,
  Tabs,
} from "@/pages/business/organization/employee/form";
import { useFormikContext } from "formik";
import { LucideArrowRight, LucideTrash, LucideUpload } from "lucide-react";
import { Button, Label, SelectItem, cn } from "paperwork-ui";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function EmployeeTabPersonal({
  setTab,
}: {
  setTab: (tab: Tabs) => void;
}) {
  const formik = useFormikContext<EmployeeFormSchema>();

  const refProfilePicture = useRef<HTMLInputElement | null>(null);
  const [previewProfilePicture, setPreviewProfilePicture] = useState<
    string | null
  >(null);

  const previewImage = (image: Blob | string | null): void => {
    if (!image) return;
    setPreviewProfilePicture(
      typeof image === "string" ? image : URL.createObjectURL(image)
    );
  };

  useEffect(() => {
    if (formik.values.employee_profile_picture) {
      previewImage(formik.values.employee_profile_picture);
    }
  }, [formik]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const validate = () => {
    if (
      formik.errors.employee_name ||
      formik.errors.employee_email ||
      formik.errors.employee_phone ||
      formik.errors.employee_telephone ||
      formik.errors.employee_birth_date ||
      formik.errors.employee_birth_place ||
      formik.errors.employee_profile_picture ||
      formik.errors.employee_gender ||
      formik.errors.employee_religion ||
      formik.errors.employee_marital_status ||
      formik.errors.employee_ktp_address ||
      formik.errors.employee_domicile_address ||
      formik.errors.employee_close_family_name ||
      formik.errors.employee_close_family_phone
    ) {
      return false;
    }
    return true;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-card border rounded-md">
        <div className="p-5 border-b flex flex-col items-center justify-between space-y-6 border-0 md:space-y-0 md:flex-row">
          <h3 className="text-2xl font-semibold tracking-tight scroll-m-20">
            Data Pribadi
          </h3>
        </div>
        <div className="p-5 pb-7 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="space-y-8 col-span-1 lg:col-span-3">
              <FormikInput
                label="Nama Lengkap"
                placeholder="Nama Lengkap"
                name="employee_name"
                id="employee_name"
                required
              />
              <FormikInput
                label="Alamat Email"
                placeholder="Alamat Email"
                name="employee_email"
                id="employee_email"
                type="email"
                required
              />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
                <FormikInput
                  label="Nomor Handphone"
                  placeholder="Nomor Handphone"
                  name="employee_phone"
                  id="employee_phone"
                  required
                />
                <FormikInput
                  label="Nomor Telepon"
                  placeholder="Nomor Telepon"
                  name="employee_telephone"
                  id="employee_telephone"
                  required
                />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
                <FormikInput
                  label="Tempat Lahir"
                  placeholder="Tempat Lahir"
                  name="employee_birth_place"
                  id="employee_birth_place"
                  required
                />

                <FormikDatePicker
                  className="!w-full !mt-2"
                  label="Tanggal Lahir"
                  placeholder="Pilih Tanggal Lahir"
                  name="employee_birth_date"
                  id="employee_birth_date"
                  required
                />
              </div>
            </div>
            <div className="col-span-1 space-y-2 lg:col-span-2">
              <Label>Foto</Label>
              <input
                ref={refProfilePicture}
                type="file"
                name="employee_profile_picture"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  formik.setFieldTouched("employee_profile_picture", true);

                  if (e.currentTarget.files !== null) {
                    const image = e.currentTarget.files[0];
                    if (image) {
                      formik.setFieldValue(
                        "employee_profile_picture",
                        e.currentTarget.files[0]
                      );
                      previewImage(e.currentTarget.files[0]);
                    }
                  }
                }}
              />
              <div
                className={cn(
                  "w-full p-4 border flex-1 bg-muted/30 rounded-lg flex flex-col justify-center items-center space-y-4 relative",
                  formik.touched.employee_profile_picture &&
                    formik.errors.employee_profile_picture &&
                    "border-destructive"
                )}
              >
                <div className="py-5">
                  {previewProfilePicture ? (
                    <img
                      src={previewProfilePicture}
                      className="object-cover bg-white rounded-full h-28 w-28"
                    />
                  ) : (
                    <div className="object-contain border rounded-full h-28 w-28 bg-muted border-input"></div>
                  )}
                </div>

                <div className="items-center justify-center flex-1 space-x-3">
                  <Button
                    type="button"
                    variant={"outline"}
                    size={"sm"}
                    onClick={() => {
                      refProfilePicture.current !== null
                        ? refProfilePicture.current.click()
                        : null;
                    }}
                  >
                    <LucideUpload className="w-4 h-4 mr-2" /> Upload
                  </Button>
                  {previewProfilePicture && (
                    <Button
                      type="button"
                      size={"sm"}
                      variant={"destructive"}
                      onClick={() => {
                        setPreviewProfilePicture(null);
                        formik.setFieldValue("employee_profile_picture", null);
                        if (refProfilePicture.current)
                          refProfilePicture.current.value = "";
                      }}
                    >
                      <LucideTrash className="w-4 h-4 mr-2" /> Hapus
                    </Button>
                  )}
                </div>
              </div>
              <div>
                {formik.touched.employee_profile_picture &&
                  formik.errors.employee_profile_picture && (
                    <span className="mt-2 text-xs text-destructive">
                      {formik.errors.employee_profile_picture}
                    </span>
                  )}
                <div className="w-full pt-1">
                  <div className="mt-2 text-xs text-muted-foreground ">
                    - Rekomendasi resolusi gambar adalah 200 x 200
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground ">
                    - Ukuran maksimal file adalah sebesar 3 MB
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    - Mendukung format file : .jpg, .jpeg, .png, .webp
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
            <FormikSelect
              label="Jenis Kelamin"
              name="employee_gender"
              className="w-full"
              placeholder="Pilih Jenis Kelamin"
              required
            >
              <SelectItem value="male">Laki-laki</SelectItem>
              <SelectItem value="female">Perempuan</SelectItem>
            </FormikSelect>
            <FormikSelect
              label="Agama"
              name="employee_religion"
              className="w-full"
              placeholder="Pilih Agama"
              required
            >
              <SelectItem value="buddha">Buddha</SelectItem>
              <SelectItem value="hindu">Hindu</SelectItem>
              <SelectItem value="islam">Islam</SelectItem>
              <SelectItem value="katolik">Katolik</SelectItem>
              <SelectItem value="konghucu">Konghucu</SelectItem>
              <SelectItem value="kristen">Kristen</SelectItem>
            </FormikSelect>
            <FormikSelect
              label="Status Pernikahan"
              name="employee_marital_status"
              className="w-full"
              placeholder="Pilih Status Pernikahan"
              required
            >
              <SelectItem value="single">Lajang</SelectItem>
              <SelectItem value="married">Menikah</SelectItem>
              <SelectItem value="divorced">Cerai</SelectItem>
            </FormikSelect>
          </div>
          <FormikInput
            label="Nomor KTP"
            placeholder="Nomor KTP"
            name="employee_ktp_number"
            id="employee_ktp_number"
            required
          />
          <FormikInput
            label="Alamat Sesuai KTP"
            placeholder="Alamat Sesuai KTP"
            name="employee_ktp_address"
            id="employee_ktp_address"
            required
          />
          <FormikInput
            label="Alamat Domisili"
            placeholder="Alamat Domisili"
            name="employee_domicile_address"
            id="employee_domicile_address"
            required
          />
          <FormikInput
            label="Nama Keluarga Dekat"
            placeholder="Nama Keluarga Dekat"
            name="employee_close_family_name"
            id="employee_close_family_name"
            required
          />
          <FormikInput
            label="Nomor Telepon Keluarga Dekat"
            placeholder="Nomor Telepon Keluarga Dekat"
            name="employee_close_family_phone"
            id="employee_close_family_phone"
            required
          />
        </div>
        <div className="flex justify-between p-5 border-t">
          <Link to={"/business/organization/employee"}>
            <Button type="button" variant="outline">
              Batal
            </Button>
          </Link>
          <Button
            type="button"
            disabled={!validate()}
            onClick={() => {
              if (validate()) setTab("history");
            }}
          >
            Selanjutnya <LucideArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
