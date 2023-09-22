import { Tabs } from "@/pages/business/organization/employee/form";
import { useFormikContext } from "formik";
import { LucideArrowLeft, LucideArrowRight } from "lucide-react";
import {
  Button,
  FormikComboBox,
  FormikDatePicker,
  FormikInput,
  FormikSelect,
  SelectItem,
} from "paperwork-ui";

export default function EmployeePreviousJobTab({
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
            Data Pekerjaan Sebelumnya
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
