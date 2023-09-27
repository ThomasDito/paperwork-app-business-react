import {
  FormikDatePicker,
  FormikInput,
  FormikSelect,
} from "@/components/formik";
import { Tabs } from "@/pages/business/organization/employee/form";
import { LucideArrowLeft, LucideArrowRight } from "lucide-react";
import { Button, SelectItem } from "paperwork-ui";
import { useEffect } from "react";

export default function EmployeeHistoryTab({
  setTab,
}: {
  setTab: (tab: Tabs) => void;
}) {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-0">
      <div className="bg-card border rounded-t-md border-t">
        <div className="p-5 border-b flex flex-col items-center justify-between space-y-6 border-0 md:space-y-0 md:flex-row">
          <h3 className="text-2xl font-semibold tracking-tight scroll-m-20">
            Riwayat Pendidikan
          </h3>
        </div>
        <div className="p-5 pb-7 space-y-8">
          <FormikInput
            label="Nama Instansi Pendidikan"
            placeholder="Nama Instansi Pendidikan"
            name="employee_education_name"
            id="employee_education_name"
            required
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
            <FormikSelect
              label="Jenjang Pendidikan"
              name="employee_education_level"
              className="w-full"
              placeholder="Pilih Jenjang Pendidikan"
              required
            >
              <SelectItem value="SD">SD</SelectItem>
              <SelectItem value="SMP">SMP</SelectItem>
              <SelectItem value="SMA">SMA</SelectItem>
              <SelectItem value="D1">D1</SelectItem>
              <SelectItem value="D2">D2</SelectItem>
              <SelectItem value="D3">D3</SelectItem>
              <SelectItem value="D4">D4</SelectItem>
              <SelectItem value="S1">S1</SelectItem>
              <SelectItem value="S2">S2</SelectItem>
              <SelectItem value="S3">S3</SelectItem>
            </FormikSelect>
            <FormikInput
              label="Tahun Lulus"
              placeholder="Tahun Lulus"
              name="employee_education_graduate"
              id="employee_education_graduate"
              required
            />
            <FormikInput
              label="Nilai / IPK"
              placeholder="Nilai / IPK"
              name="employee_education_score"
              id="employee_education_score"
              type="number"
              min="0"
              required
            />
          </div>
        </div>
      </div>
      <div className="bg-card border border-t-0 rounded-b-md">
        <div className="p-5 border-b flex flex-col items-center justify-between space-y-6 border-0 md:space-y-0 md:flex-row">
          <h3 className="text-2xl font-semibold tracking-tight scroll-m-20">
            Riwayat Pekerjaan
          </h3>
        </div>
        <div className="p-5 pb-7 space-y-8">
          <FormikInput
            label="Nama Perusahaan Sebelumnya"
            placeholder="Nama Perusahaan Sebelumnya"
            name="employee_previous_job_office_name"
            id="employee_previous_job_office_name"
            required
          />
          <FormikInput
            label="Alamat Perusahaan"
            placeholder="Alamat Perusahaan"
            name="employee_previous_job_office_address"
            id="employee_previous_job_office_address"
            required
          />
          <FormikInput
            label="Nomor Telepon Perusahaan"
            placeholder="Nomor Telepon Perusahaan"
            name="employee_previous_job_office_phone"
            id="employee_previous_job_office_phone"
            required
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
            <FormikInput
              label="Divisi"
              placeholder="Divisi"
              name="employee_previous_job_division"
              id="employee_previous_job_division"
              required
            />
            <FormikInput
              label="Jabatan"
              placeholder="Jabatan"
              name="employee_previous_job_position"
              id="employee_previous_job_position"
              required
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
            <FormikDatePicker
              className="!w-full"
              label="Tanggal Mulai Kerja"
              placeholder="Tanggal Mulai Kerja"
              name="employee_previous_job_start_date"
              id="employee_previous_job_start_date"
              required
            />
            <FormikDatePicker
              className="!w-full"
              label="Tanggal Berakhir Kerja"
              placeholder="Tanggal Berakhir Kerja"
              name="employee_previous_job_end_date"
              id="employee_previous_job_end_date"
              required
            />
          </div>
        </div>
        <div className="flex justify-between p-5 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={() => setTab("personal")}
          >
            <LucideArrowLeft className="w-5 h-5 mr-2" /> Sebelumnya
          </Button>
          <Button type="button" onClick={() => setTab("employee")}>
            Selanjutnya <LucideArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
