import LoadingPage from "@/components/loading-page";
import { toastError, toastSuccess } from "@/components/ui/toast";
import {
  EMPLOYEE_EDUCATION_LEVELS,
  EMPLOYEE_GENDERS,
  EMPLOYEE_MARITAL_STATUSES,
  EMPLOYEE_RELIGIONS,
  REGEX,
} from "@/lib/consts";
import EmployeeStepper from "@/pages/business/organization/employee/components/stepper";
import EmployeeEmployeeTab from "@/pages/business/organization/employee/tabs/employee";
import EmployeeHistoryTab from "@/pages/business/organization/employee/tabs/history";
import EmployeeTabPersonal from "@/pages/business/organization/employee/tabs/personal";
import {
  useBusinessEmployeeStoreMutation,
  useBusinessEmployeeUpdateMutation,
  useLazyBusinessEmployeeShowQuery,
} from "@/redux/api/business/employee-api";
import { useAppSelector } from "@/redux/hooks";
import { selectOrganization } from "@/redux/slices/auth-slice";
import { employee } from "@/types/schema";
import { Form, Formik, FormikHelpers } from "formik";
import { withZodSchema } from "formik-validator-zod";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 3; //3MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export type Tabs = "personal" | "history" | "employee";

const formSchema = z.object({
  employee_id: z
    .string({ required_error: "Harus diisi" })
    .min(1, "Harus diisi")
    .max(150, "Maksimal 150 karakter")
    .trim(),
  employee_name: z
    .string({ required_error: "Harus diisi" })
    .min(1, "Harus diisi")
    .max(150, "Maksimal 150 karakter")
    .trim(),
  employee_email: z
    .string({ required_error: "Harus diisi" })
    .email("Email tidak valid")
    .min(1, "Harus diisi")
    .max(150, "Maksimal 150 karakter")
    .trim(),
  employee_phone: z
    .string()
    .regex(new RegExp(REGEX.PHONE), "Nomor handphone tidak valid")
    .trim(),
  employee_telephone: z
    .string()
    .regex(new RegExp(REGEX.PHONE), "Nomor telepon tidak valid")
    .trim(),
  employee_birth_place: z
    .string({ required_error: "Harus diisi" })
    .min(1, "Harus diisi")
    .max(150, "Maksimal 150 karakter")
    .trim(),
  employee_birth_date: z.date(),
  employee_gender: z.enum(EMPLOYEE_GENDERS, {
    errorMap: () => ({ message: "Jenis kelamin tidak valid" }),
  }),
  employee_marital_status: z.enum(EMPLOYEE_MARITAL_STATUSES, {
    errorMap: () => ({ message: "Status pernikahan tidak valid" }),
  }),
  employee_religion: z.enum(EMPLOYEE_RELIGIONS, {
    errorMap: () => ({ message: "Agama tidak valid" }),
  }),
  employee_ktp_number: z
    .string({ required_error: "Harus diisi" })
    .min(16, "Minimal 16 digit")
    .max(16, "Maksimal 16 digit")
    .trim(),
  employee_ktp_address: z
    .string({ required_error: "Harus diisi" })
    .min(1, "Harus diisi")
    .max(150, "Maksimal 150 karakter")
    .trim(),
  employee_domicile_address: z
    .string({ required_error: "Harus diisi" })
    .min(1, "Harus diisi")
    .max(150, "Maksimal 150 karakter")
    .trim(),
  employee_close_family_name: z
    .string({ required_error: "Harus diisi" })
    .min(1, "Harus diisi")
    .max(150, "Maksimal 150 karakter")
    .trim(),
  employee_close_family_phone: z
    .string()
    .regex(new RegExp(REGEX.PHONE), "Nomor telepon tidak valid")
    .trim(),
  employee_education_level: z.enum(EMPLOYEE_EDUCATION_LEVELS, {
    errorMap: () => ({ message: "Jenjang pendidikan tidak valid" }),
  }),
  employee_education_name: z
    .string({ required_error: "Harus diisi" })
    .min(1, "Harus diisi")
    .max(150, "Maksimal 150 karakter")
    .trim(),
  employee_education_graduate: z
    .string({ required_error: "Harus diisi" })
    .regex(new RegExp(REGEX.YEAR), "Tahun tidak valid")
    .trim()
    .refine(
      (year) => +year <= +moment(new Date()).format("YYYY"),
      "Tahun tidak valid"
    ),
  employee_education_score: z
    .number({
      coerce: true,
      required_error: "Harus diisi",
    })
    .min(0, "Nilai tidak valid"),
  employee_previous_job_position: z
    .string({ required_error: "Harus diisi" })
    .min(1, "Harus diisi")
    .max(150, "Maksimal 150 karakter")
    .trim(),
  employee_previous_job_division: z
    .string({ required_error: "Harus diisi" })
    .min(1, "Harus diisi")
    .max(150, "Maksimal 150 karakter")
    .trim(),
  employee_previous_job_office_name: z
    .string({ required_error: "Harus diisi" })
    .min(1, "Harus diisi")
    .max(150, "Maksimal 150 karakter")
    .trim(),
  employee_previous_job_office_address: z
    .string({ required_error: "Harus diisi" })
    .min(1, "Harus diisi")
    .max(150, "Maksimal 150 karakter")
    .trim(),
  employee_previous_job_office_phone: z
    .string()
    .regex(new RegExp(REGEX.PHONE), "Nomor telepon tidak valid")
    .trim(),
  employee_previous_job_start_date: z.date(),
  employee_previous_job_end_date: z.date(),
  employee_join_date: z.date(),
  employee_contract_start_date: z.date(),
  employee_contract_end_date: z.date(),
  employee_bpjs_kesehatan_number: z
    .string({ required_error: "Harus diisi" })
    .min(1, "Harus diisi")
    .max(150, "Maksimal 150 karakter")
    .trim()
    .nullish()
    .or(z.literal("")),
  employee_bpjs_ketenagakerjaan_number: z
    .string({ required_error: "Harus diisi" })
    .min(1, "Harus diisi")
    .max(150, "Maksimal 150 karakter")
    .trim()
    .nullish()
    .or(z.literal("")),
  employee_email_office: z
    .string({ required_error: "Harus diisi" })
    .email("Email tidak valid")
    .min(1, "Harus diisi")
    .max(150, "Maksimal 150 karakter")
    .trim()
    .nullish(),
  branch_id: z.string({ required_error: "Harus diisi" }).min(1, "Harus diisi"),
  division_id: z
    .string({ required_error: "Harus diisi" })
    .min(1, "Harus diisi"),
  position_id: z
    .string({ required_error: "Harus diisi" })
    .min(1, "Harus diisi"),
  level_id: z.string({ required_error: "Harus diisi" }).min(1, "Harus diisi"),
  employee_status_id: z
    .string({ required_error: "Harus diisi" })
    .min(1, "Harus diisi"),
  employee_profile_picture: z
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

export type EmployeeFormSchema = z.infer<typeof formSchema>;

export default function EmployeeForm() {
  // Hooks
  const organization = useAppSelector(selectOrganization);
  const navigate = useNavigate();
  const { id } = useParams();

  // RTK Query
  const [storeEmployee, { isLoading: storeIsLoading }] =
    useBusinessEmployeeStoreMutation();

  const [updateEmployee, { isLoading: updateIsLoading }] =
    useBusinessEmployeeUpdateMutation();

  const isLoading = storeIsLoading || updateIsLoading;

  const [
    showEmployee,
    { isLoading: showEmployeeIsLoading, isError: showEmployeeIsError },
  ] = useLazyBusinessEmployeeShowQuery();

  const [tab, setTab] = useState<Tabs>("personal");

  const [initialValues, setInitialValues] = useState<EmployeeFormSchema>({
    employee_id: "",
    employee_name: "",
    branch_id: "",
    division_id: "",
    level_id: "",
    position_id: "",
    employee_status_id: "",
    employee_birth_date: new Date(),
    employee_birth_place: "",
    employee_bpjs_ketenagakerjaan_number: "",
    employee_close_family_name: "",
    employee_close_family_phone: "",
    employee_contract_end_date: new Date(),
    employee_contract_start_date: new Date(),
    employee_domicile_address: "",
    employee_education_graduate: "",
    employee_education_level: "SD",
    employee_education_name: "",
    employee_education_score: 0,
    employee_email: "",
    employee_gender: "male",
    employee_join_date: new Date(),
    employee_ktp_address: "",
    employee_ktp_number: "",
    employee_marital_status: "single",
    employee_phone: "",
    employee_religion: "buddha",
    employee_telephone: "",
    employee_bpjs_kesehatan_number: "",
    employee_previous_job_division: "",
    employee_previous_job_office_address: "",
    employee_previous_job_office_name: "",
    employee_previous_job_office_phone: "",
    employee_previous_job_position: "",
    employee_previous_job_start_date: new Date(),
    employee_previous_job_end_date: new Date(),
  });

  useEffect(() => {
    if (id) detailEmployee(id);
  }, [id]);

  // Actions
  const detailEmployee = async (id: string) => {
    await showEmployee(id)
      .unwrap()
      .then((employee) => {
        setInitialValues({
          ...employee,
          employee_telephone: employee.employee_telephone ?? "",
          employee_birth_date: moment(employee.employee_birth_date).toDate(),
          employee_education_graduate:
            employee.employee_education_graduate.toString(),
          employee_previous_job_division:
            employee.employee_previous_job_division ?? "",
          employee_previous_job_position:
            employee.employee_previous_job_position ?? "",
          employee_previous_job_office_address:
            employee.employee_previous_job_office_address ?? "",
          employee_previous_job_office_name:
            employee.employee_previous_job_office_name ?? "",
          employee_previous_job_office_phone:
            employee.employee_previous_job_office_phone ?? "",
          employee_previous_job_start_date:
            employee.employee_previous_job_start_date
              ? moment(employee.employee_previous_job_start_date).toDate()
              : new Date(),
          employee_previous_job_end_date:
            employee.employee_previous_job_end_date
              ? moment(employee.employee_previous_job_end_date).toDate()
              : new Date(),
          employee_join_date: moment(employee.employee_join_date).toDate(),
          employee_contract_start_date: moment(
            employee.employee_contract_start_date
          ).toDate(),
          employee_contract_end_date: moment(
            employee.employee_contract_end_date
          ).toDate(),
        });
      })
      .catch((rejected: { message?: string; data?: ApiResponse<unknown> }) => {
        toastError(
          rejected?.data?.message || "Terjadi kesalahan ketika mengambil data"
        );
      });
  };

  const submitForm = async (
    values: EmployeeFormSchema,
    formik: FormikHelpers<EmployeeFormSchema>
  ) => {
    const payload: FormData = new FormData();

    const {
      employee_profile_picture,
      employee_birth_date,
      employee_join_date,
      employee_contract_start_date,
      employee_contract_end_date,
      employee_previous_job_start_date,
      employee_previous_job_end_date,
      ...data
    } = values;

    payload.append(
      "employee_birth_date",
      moment(employee_birth_date).format("YYYY-MM-DD")
    );
    payload.append(
      "employee_join_date",
      moment(employee_join_date).format("YYYY-MM-DD")
    );
    payload.append(
      "employee_contract_start_date",
      moment(employee_contract_start_date).format("YYYY-MM-DD")
    );
    payload.append(
      "employee_contract_end_date",
      moment(employee_contract_end_date).format("YYYY-MM-DD")
    );
    payload.append(
      "employee_previous_job_start_date",
      moment(employee_previous_job_start_date).format("YYYY-MM-DD")
    );
    payload.append(
      "employee_previous_job_end_date",
      moment(employee_previous_job_end_date).format("YYYY-MM-DD")
    );

    if (
      employee_profile_picture &&
      typeof employee_profile_picture !== "string"
    ) {
      payload.append("employee_profile_picture", employee_profile_picture);
    }

    Object.entries(data).forEach((item) => {
      const key = item[0];
      let value = item[1];

      if (value) {
        if (typeof value === "number") value = value.toString();
        payload.append(key, value);
      }
    });

    if (organization) {
      payload.delete("organization_id");
      payload.set("organization_id", organization.id);
    }

    if (!id) {
      await storeEmployee(payload as unknown as employee)
        .unwrap()
        .then(
          (response) => {
            toastSuccess(response?.message || "Anggota berhasil ditambahkan");
            navigate("/business/organization/employee");
          },
          (rejected: { status: number; data?: ApiResponse<unknown> }) => {
            const message = rejected.data?.message;

            if (rejected.status === 422 && rejected.data) {
              formik.setErrors(
                rejected.data?.errors as unknown as Record<string, string>
              );
            }

            toastError(message || "Terjadi kesalahan ketika menyimpan data");
          }
        );
    } else {
      await updateEmployee({ id, payload: payload as unknown as employee })
        .unwrap()
        .then(
          (response) => {
            toastSuccess(response?.message || "Anggota berhasil disimpan");
            navigate("/business/organization/employee");
          },
          (rejected: { status: number; data?: ApiResponse<unknown> }) => {
            const message = rejected.data?.message;

            if (rejected.status === 422 && rejected.data) {
              formik.setErrors(
                rejected.data?.errors as unknown as Record<string, string>
              );
            }

            toastError(message || "Terjadi kesalahan ketika menyimpan data");
          }
        );
    }
  };

  if (showEmployeeIsError) {
    return <div>Terjadi kesalahan ketika mengambil data</div>;
  }

  if (showEmployeeIsLoading) {
    return <LoadingPage />;
  }

  return (
    <Formik
      validate={withZodSchema(formSchema)}
      initialValues={initialValues}
      onSubmit={submitForm}
      enableReinitialize={true}
    >
      {() => {
        return (
          <Form>
            <EmployeeStepper tab={tab} />
            {tab === "personal" && <EmployeeTabPersonal setTab={setTab} />}
            {tab === "history" && <EmployeeHistoryTab setTab={setTab} />}
            {tab === "employee" && (
              <EmployeeEmployeeTab setTab={setTab} isLoading={isLoading} />
            )}
          </Form>
        );
      }}
    </Formik>
  );
}
