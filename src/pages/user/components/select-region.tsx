import { ProfileUpdateSchemaType } from "@/pages/user/tabs/user";
import { useLazyRegionGetCitiesByProvinceIdQuery, useLazyRegionGetProvincesQuery } from "@/redux/api/superadmin/region-api";
import { FormikProps } from "formik";
import { Loader2 } from "lucide-react";
import { Label, FormikComboBox } from "paperwork-ui";
import { useEffect } from "react";

export default function SelectRegion({ isEdit, props }: { isEdit: boolean; props: FormikProps<ProfileUpdateSchemaType> }): JSX.Element {
  const [getProvinces, { data: provinces = [], isLoading: getProvincesIsLoading, isFetching: getProvincesIsFetching, isError: getProvincesIsError }] =
    useLazyRegionGetProvincesQuery();

  const [getCitiesByProvinceId, { data: cities = [], isLoading: getCitiesIsLoading, isFetching: getCitiesIsFetching, isError: getCitiesIsError }] =
    useLazyRegionGetCitiesByProvinceIdQuery();

  useEffect(() => {
    if (!props.values.city_id?.startsWith(props.values.province_id + ".")) {
      props.setFieldValue("city_id", "");
    }
    if (props.values.province_id) {
      getCitiesByProvinceId(props.values.province_id);
    }
  }, [props.values.province_id]);

  useEffect(() => {
    if (props.values.city_id || props.values.province_id) {
      props.setFieldTouched("city_id");
      props.setFieldTouched("province_id");
    }
  }, [props.values.province_id, props.values.city_id]);

  useEffect(() => {
    getProvinces();
  }, []);

  return (
    <>
      <FormikComboBox
        disabled={!isEdit}
        name="province_id"
        label="Provinsi"
        id="province_id"
        className="w-full"
        values={provinces.map((province) => {
          return {
            value: province.id,
            label: province.region_name,
          };
        })}
        placeholder="Pilih Provinsi"
        placeholderNotFound="Provinsi tidak ditemukan"
        placeholderSearch="Cari Provinsi..."
      />
      {(getProvincesIsFetching || getProvincesIsLoading) && (
        <div className="flex text-xs item-center text-muted-foreground">
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Memuat data provinsi...
        </div>
      )}
      {getProvincesIsError && (
        <span className="mt-2 text-xs text-destructive">
          Gagal memuat data.{" "}
          <span onClick={() => getProvinces()} className="font-medium cursor-pointer hover:underline">
            Ulangi
          </span>
        </span>
      )}
      <FormikComboBox
        disabled={!isEdit}
        name="city_id"
        label="Kabupaten/Kota"
        id="city_id"
        className="w-full"
        values={
          props.values.province_id
            ? cities.map((city) => {
                return {
                  value: city.id,
                  label: city.region_name,
                };
              })
            : []
        }
        placeholder="Pilih Kabupaten/Kota"
        placeholderNotFound="Kabupaten/Kota tidak ditemukan"
        placeholderSearch="Cari Kabupaten/Kota..."
      />
      {(getCitiesIsFetching || getCitiesIsLoading) && (
        <div className="flex text-xs item-center text-muted-foreground">
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Memuat data kabupaten/kota...
        </div>
      )}
      {getCitiesIsError && (
        <span className="mt-2 text-xs text-destructive">
          Gagal memuat data.{" "}
          <span onClick={() => getCitiesByProvinceId(props.values.province_id!)} className="font-medium cursor-pointer hover:underline">
            Ulangi
          </span>
        </span>
      )}
    </>
  );
}
