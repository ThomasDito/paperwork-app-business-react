import EmployeeEmployeeTab from "@/pages/business/organization/employee/tabs/employee";
import EmployeeTabPersonal from "@/pages/business/organization/employee/tabs/personal";
import EmployeePreviousJobTab from "@/pages/business/organization/employee/tabs/previous-job";
import { Form, Formik, FormikProps } from "formik";
import { withZodSchema } from "formik-validator-zod";
import { useState } from "react";
import { z } from "zod";

export type Tabs = "personal" | "previous_job" | "employee";

const formSchema = z.object({
  employee_name: z.string(),
});

export type EmployeeFormSchema = z.infer<typeof formSchema>;

export default function EmployeeForm() {
  const [tab, setTab] = useState<Tabs>("personal");

  const [initialValues] = useState<EmployeeFormSchema>({
    employee_name: "",
  });

  return (
    <Formik
      initialValues={initialValues}
      validate={withZodSchema(formSchema)}
      onSubmit={() => {}}
      enableReinitialize={true}
      validateOnBlur={false}
    >
      {(_formik: FormikProps<EmployeeFormSchema>) => (
        <Form>
          {tab === "personal" && <EmployeeTabPersonal setTab={setTab} />}
          {tab === "previous_job" && <EmployeePreviousJobTab setTab={setTab} />}
          {tab === "employee" && <EmployeeEmployeeTab setTab={setTab} />}
        </Form>
      )}
    </Formik>
  );
}
