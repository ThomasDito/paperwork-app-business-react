import { Tabs } from "@/pages/business/organization/employee/form";
import { useFormikContext } from "formik";
import { LucideArrowRight } from "lucide-react";
import {
  Button,
  FormikComboBox,
  FormikDatePicker,
  FormikInput,
  FormikSelect,
  SelectItem,
} from "paperwork-ui";
import { Link } from "react-router-dom";

export default function EmployeeTabPersonal({
  setTab,
}: {
  setTab: (tab: Tabs) => void;
}) {
  const formik = useFormikContext();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-card border rounded-md">
        <div className="p-5 border-b flex flex-col items-center justify-between space-y-6 border-0 md:space-y-0 md:flex-row">
          <h3 className="text-2xl font-semibold tracking-tight scroll-m-20">
            Data Pribadi
          </h3>
        </div>
        <div className="p-5 pb-7 space-y-8">
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
              className="!w-full !mt-4"
              label="Tanggal Lahir"
              placeholder="Pilih Tanggal Lahir"
              name="employee_birth_date"
              id="employee_birth_date"
              required
            />
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
            <Button variant="outline">Batal</Button>
          </Link>
          <Button type="button" onClick={() => setTab("previous_job")}>
            Selanjutnya <LucideArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}