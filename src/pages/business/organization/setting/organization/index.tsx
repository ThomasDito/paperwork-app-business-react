import { FormikComboBox, FormikInput } from "@/components/formik";
import LoadingPage from "@/components/loading-page";
import useRole from "@/hooks/useRole";
import config from "@/lib/config";
import { useBusinessOrganizationUpdateMutation } from "@/redux/api/business/business/organization-api";
import {
  useLazyBusinessRegionGetCitiesByProvinceIdQuery,
  useLazyBusinessRegionGetProvincesQuery,
} from "@/redux/api/business/business/region-api";
import { useAppSelector } from "@/redux/hooks";
import { selectOrganization } from "@/redux/slices/auth-slice";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import { withZodSchema } from "formik-validator-zod";
import {
  LucideImage,
  LucideLoader2,
  LucideSave,
  LucideUpload,
} from "lucide-react";
import { Button, Label, cn, toastError, toastSuccess } from "paperwork-ui";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { organization } from "@/types/schema";
import { Link } from "react-router-dom"; // import untuk Link

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

export default function OrganizationSetting() {
  // Hooks
  const organization = useAppSelector(selectOrganization);

  // Permissions
  const canWrite = useRole("organization_setting", "write");

  // RTK Query
  const [save, { isLoading: saveIsLoading }] =
    useBusinessOrganizationUpdateMutation();

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

  const previewImage = (image: Blob | string | null): void => {
    if (!image) return;
    setPreviewLogo(
      typeof image === "string" ? image : URL.createObjectURL(image)
    );
  };

  async function onSubmit(
    values: OrganizationSchemaType,
    formikHelpers: FormikHelpers<OrganizationSchemaType>
  ) {
    const payload = new FormData();
    Object.entries(values).forEach((value) => {
      if (value[1]) {
        payload.append(value[0], value[1]);
      }
    });

    if (values.organization_logo) {
      if (values.organization_logo instanceof File) {
        payload.set("organization_logo", values.organization_logo);
      } else {
        payload.delete("organization_logo");
      }
    } else {
      payload.set("organization_logo", "");
    }

    await save(payload as unknown as organization)
      .unwrap()
      .then((response) => {
        toastSuccess(response.message || "Pengaturan berhasil disimpan");
        formikHelpers.resetForm();
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

  if (!organization) return <LoadingPage />;

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
            <Link to="/business/organization/setting" className="text-gray-400 hover:text-gray-500">
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
            <Link to="/business/organization/setting" className="text-gray-400 hover:text-gray-500">
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
            <span className="text-gray-500">Organisasi</span>
          </li>
        </ol>
      </nav>

      {/* Form Organisasi */}
      <Formik
      initialValues={initialValues}
      validate={withZodSchema(organizationSchema)}
      onSubmit={onSubmit}
      enableReinitialize={true}
      validateOnBlur={false}
      >
        {(formik: FormikProps<OrganizationSchemaType>) => {
          console.log(formik.errors);
          return (
            <Form>
              <div className="shadow-sm rounded-md bg-card">
                <div className="p-5 py-6 flex flex-col items-center justify-between space-y-6 border-0 md:space-y-0 md:flex-row border-b">
                  <h3 className="text-2xl font-semibold tracking-tight scroll-m-20">
                    Organisasi
                  </h3>
                </div>
                <div className="p-5 space-y-7">
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
                      disabled
                      readOnly
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
                            Tidak Ada Logo
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
                            <LucideUpload className="w-4 h-4 mr-3" /> Ubah Logo
                          </Button>
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
                </div>
                {canWrite && (
                  <div className="flex justify-end p-5 border-t">
                    <Button type="submit" disabled={saveIsLoading}>
                      {saveIsLoading ? (
                        <>
                          <LucideLoader2 className="w-5 h-5 mr-2" /> Menyimpan
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
      if (!formik.values.city_id.includes(formik.values.province_id)) {
        formik.setFieldValue("city_id", "");
      }
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
