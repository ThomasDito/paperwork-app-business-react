import { FormikComboBox, FormikInput } from "@/components/formik";
import LoadingPage from "@/components/loading-page";
import useRole from "@/hooks/useRole";
import config from "@/lib/config";
import {
  useLazyBusinessRegionGetCitiesByProvinceIdQuery,
  useLazyBusinessRegionGetProvincesQuery,
} from "@/redux/api/business/business/region-api";
import { useAppSelector } from "@/redux/hooks";
import { selectOrganization } from "@/redux/slices/auth-slice";
import { Form, Formik, FormikProps } from "formik";
import { withZodSchema } from "formik-validator-zod";
import {
  LucideImage,
  LucideLoader2,
  LucideSave,
  LucideTrash,
  LucideUpload,
} from "lucide-react";
import { Button, Label, cn } from "paperwork-ui";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 3; //3MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const organizationSchema = z.object({
  organization_name: z
    .string({ required_error: "Harus diisi" })
    .min(1, "Harus diisi")
    .max(150, "Maksimal 150 karakter")
    .trim(),
  organization_nicename: z
    .string({ required_error: "Harus diisi" })
    .regex(/^[a-z]+$/, "Hanya diperbolehkan huruf abjad saja")
    .min(6, "Minimal 6 karakter")
    .max(30, "Maksimal 30 karakter")
    .trim(),
  organization_address_1: z
    .string({ required_error: "Harus diisi" })
    .min(1, "Harus diisi")
    .max(150, "Maksimal 150 karakter")
    .trim(),
  organization_address_2: z
    .string()
    .min(1, "Minimal 1 karakter")
    .max(150, "Maksimal 150 karakter")
    .trim()
    .nullish()
    .or(z.literal("")),
  province_id: z
    .string({ required_error: "Harus diisi" })
    .min(1, "Harus diisi")
    .trim(),
  city_id: z
    .string({ required_error: "Harus diisi" })
    .min(1, "Harus diisi")
    .trim(),
  organization_postal_code: z
    .string({ required_error: "Harus diisi" })
    .length(5, "Harus 5 digit")
    .trim(),
  organization_logo: z
    .instanceof(File)
    .nullish()
    .refine(
      (file) => !file || (file && file?.size / 1024 <= MAX_FILE_SIZE),
      `Maksimal ukuran file adalah 3 MB.`
    )
    .refine(
      (file) => !file || (file && ACCEPTED_IMAGE_TYPES.includes(file?.type)),
      "Hanya diperbolehkan file berformat .jpg, .jpeg, .png dan .webp"
    )
    .or(z.string()),
});

export type OrganizationSchemaType = z.infer<typeof organizationSchema>;

export default function OrganizationIndex() {
  // Hooks
  const organization = useAppSelector(selectOrganization);

  // Permissions
  const canWrite = useRole("organization_setting", "write");

  // States
  const refLogo = useRef<HTMLInputElement | null>(null);
  const [previewLogo, setPreviewLogo] = useState<string>("");

  const [initialValues, setInitialValues] = useState<OrganizationSchemaType>({
    organization_name: "",
    organization_nicename: "",
    organization_logo: null,
    organization_address_1: "",
    organization_address_2: "",
    province_id: "",
    city_id: "",
    organization_postal_code: "",
  });

  // React Hooks
  useEffect(() => {
    if (organization) {
      setInitialValues({
        ...organization,
      });

      previewImage(organization.organization_logo);
    }
  }, [organization]);

  // Functions
  const clearLogo = (formik: FormikProps<OrganizationSchemaType>): void => {
    setPreviewLogo("");
    formik.setFieldValue("organization_logo", null);
    if (refLogo.current) refLogo.current.value = "";
  };

  const previewImage = (image: Blob | string | null): void => {
    if (!image) return;
    setPreviewLogo(
      typeof image === "string" ? image : URL.createObjectURL(image)
    );
  };

  if (!organization) return <LoadingPage />;

  return (
    <div className="border rounded-md bg-card">
      <div className="p-5 py-6 flex flex-col items-center justify-between space-y-6 border-0 md:space-y-0 md:flex-row border-b">
        <h3 className="text-2xl font-semibold tracking-tight scroll-m-20">
          Organisasi
        </h3>
      </div>
      <div className="p-5">
        <Formik
          initialValues={initialValues}
          validate={withZodSchema(organizationSchema)}
          onSubmit={() => {
            console.log("submit");
          }}
          enableReinitialize={true}
          validateOnBlur={false}
        >
          {(formik: FormikProps<OrganizationSchemaType>) => (
            <Form className="space-y-7">
              <FormikInput
                label="Nama Organisasi"
                required
                name="organization_name"
                id="organization_name"
                placeholder="Nama Organisasi"
                disabled={!canWrite}
              />

              <div className="flex item-start space-x-2">
                <FormikInput
                  label="Organisasi ID"
                  name="organization_nicename"
                  type="text"
                  placeholder="Organisasi ID"
                  className="w-[300px]"
                  required
                  disabled={!canWrite}
                  onChange={(e) => {
                    const value = e.target.value;
                    const regex = /^[a-z]+$/;
                    if (value.match(regex) || value === "") {
                      // setErrorNicename(null);
                      formik.setFieldValue(
                        "organization_nicename",
                        e.target.value.toLowerCase().trim()
                      );
                    }
                  }}
                  onBlur={async () => {
                    formik.setFieldTouched("organization_nicename", true);
                    // if (e.target.value) {
                    //   await checkNicename(e.target.value);
                    // }
                    formik.validateForm();
                  }}
                />
                <div className="text-sm flex items-start mt-8 pt-[10px] text-muted-foreground">
                  {config.SUBDOMAIN_URL}
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <Label className="flex">Logo Organisasi</Label>
                <input
                  ref={refLogo}
                  type="file"
                  name="organization_logo"
                  className="hidden"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={(e) => {
                    if (e.currentTarget.files !== null) {
                      const image = e.currentTarget.files[0];
                      if (image) {
                        formik.setFieldValue(
                          "organization_logo",
                          e.currentTarget.files[0]
                        );
                        previewImage(e.currentTarget.files[0]);
                      }
                    }
                  }}
                />
                <div
                  className={cn(
                    "w-full py-8 border-2 border-dashed border-spacing-8 rounded-lg flex flex-col justify-center items-center flex-1 h-full shadow-sm"
                  )}
                >
                  {previewLogo ? (
                    <img src={previewLogo} className="max-h-44 max-w-md" />
                  ) : (
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                      <LucideImage className="w-16 h-16 text-slate-400" />
                      <div className="text-sm font-medium text-slate-400">
                        Belum Ada Logo
                      </div>
                    </div>
                  )}

                  {canWrite && (
                    <div className="flex items-center space-x-3 mt-8">
                      <Button
                        type="button"
                        variant={"outline"}
                        size="sm"
                        onClick={() =>
                          refLogo.current !== null
                            ? refLogo.current.click()
                            : null
                        }
                      >
                        <LucideUpload className="w-4 h-4 mr-3" /> Upload Logo
                      </Button>
                      {formik.values.organization_logo && (
                        <Button
                          type="button"
                          size="sm"
                          variant={"destructive"}
                          onClick={() => clearLogo(formik)}
                        >
                          <LucideTrash className="w-4 h-4 mr-3" /> Hapus
                        </Button>
                      )}
                    </div>
                  )}
                </div>

                {canWrite && (
                  <div>
                    {formik.touched.organization_logo &&
                      formik.errors.organization_logo && (
                        <span className="mt-2 text-xs text-destructive">
                          {formik.errors.organization_logo}
                        </span>
                      )}
                    <div className="w-full pt-1">
                      <div className="mt-2 text-xs text-muted-foreground ">
                        - Ukuran maksimal file adalah sebesar 3 MB
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground">
                        - Mendukung format file : .jpg, .jpeg, .png, .webp
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <FormikInput
                label="Alamat 1"
                placeholder="Alamat 1"
                name="organization_address_1"
                id="organization_address_1"
                required
                disabled={!canWrite}
              />

              <FormikInput
                label="Alamat 2"
                placeholder="Alamat 2"
                name="organization_address_2"
                id="organization_address_2"
                disabled={!canWrite}
              />

              <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                <SelectRegion formik={formik} />
                <FormikInput
                  label="Kode Pos"
                  placeholder="Kode Pos"
                  name="organization_postal_code"
                  id="organization_postal_code"
                  required
                  disabled={!canWrite}
                  onChange={(e) => {
                    const value = e.target.value;
                    const regex = /^[0-9]+$/;
                    if (value.match(regex) || value === "") {
                      if (value.length <= 5) {
                        formik.setFieldValue(
                          "organization_postal_code",
                          e.target.value.trim()
                        );
                      }
                    }
                  }}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
      {canWrite && (
        <div className="flex justify-end p-5 border-t">
          <Button>
            <LucideSave className="w-5 h-5 mr-2" /> Simpan
          </Button>
        </div>
      )}
    </div>
  );
}

function SelectRegion({
  formik,
}: {
  formik: FormikProps<OrganizationSchemaType>;
}) {
  // Permissions
  const canWrite = useRole("organization_setting", "write");

  // RTK Query
  const [
    getProvinces,
    {
      data: provinces = [],
      isLoading: getProvincesIsLoading,
      isFetching: getProvincesIsFetching,
      isError: getProvincesIsError,
    },
  ] = useLazyBusinessRegionGetProvincesQuery();

  const [
    getCitiesByProvinceId,
    {
      data: cities = [],
      isLoading: getCitiesIsLoading,
      isFetching: getCitiesIsFetching,
      isError: getCitiesIsError,
    },
  ] = useLazyBusinessRegionGetCitiesByProvinceIdQuery();

  useEffect(() => {
    getProvinces();
  }, []);

  useEffect(() => {
    if (formik.values.province_id) {
      formik.setFieldTouched("city_id");
      getCitiesByProvinceId(formik.values.province_id);
    }
  }, [formik.values.province_id]);

  return (
    <>
      <div className="space-y-2">
        <FormikComboBox
          label="Provinsi"
          name="province_id"
          className="w-full"
          placeholder="Pilih Provinsi"
          placeholderNotFound="Provinsi tidak ditemukan"
          placeholderSearch="Cari Provinsi..."
          required
          disabled={!canWrite}
          values={provinces.map((province) => {
            return {
              value: province.id,
              label: province.region_name,
            };
          })}
        />
        {(getProvincesIsFetching || getProvincesIsLoading) && (
          <div className="flex item-center text-xs text-muted-foreground">
            <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
            Memuat data provinsi...
          </div>
        )}
        {getProvincesIsError && (
          <span className="mt-2 text-xs text-destructive">
            Gagal memuat data.{" "}
            <span
              onClick={() => getProvinces()}
              className="font-medium hover:underline cursor-pointer"
            >
              Ulangi
            </span>
          </span>
        )}
      </div>
      <div className="space-y-2">
        <FormikComboBox
          label="Kabupaten/Kota"
          name="city_id"
          className="w-full"
          placeholder="Pilih Kabupaten/Kota"
          placeholderNotFound="Kabupaten/Kota tidak ditemukan"
          placeholderSearch="Cari Kabupaten/Kota..."
          required
          disabled={!canWrite}
          values={
            formik.values.province_id
              ? cities.map((city) => {
                  return {
                    value: city.id,
                    label: city.region_name,
                  };
                })
              : []
          }
        />
        {(getCitiesIsFetching || getCitiesIsLoading) && (
          <div className="flex item-center text-xs text-muted-foreground">
            <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
            Memuat data kabupaten/kota...
          </div>
        )}
        {getCitiesIsError && (
          <span className="mt-2 text-xs text-destructive">
            Gagal memuat data.{" "}
            <span
              onClick={() => getCitiesByProvinceId(formik.values.province_id)}
              className="font-medium hover:underline cursor-pointer"
            >
              Ulangi
            </span>
          </span>
        )}
      </div>
    </>
  );
}
