import { Tabs } from "@/pages/business/organization/employee/form";
import { cn } from "paperwork-ui";

export default function EmployeeStepper({ tab }: { tab: Tabs }) {
  return (
    <div className="hidden md:block max-w-4xl mx-auto mt-5 mb-12">
      <ol className="flex items-center justify-between w-full text-md font-medium text-center text-gray-500">
        <li
          className={cn(
            "flex w-full items-center after:w-full after:h-1 after:border-b after:border-gray-200 after:inline-block after:mx-6 xl:after:mx-10 after:content-['']",
            (tab === "personal" || tab === "history" || tab === "employee") &&
              "text-primary-50",
            (tab === "history" || tab === "employee") &&
              "after:border-primary/25"
          )}
        >
          <span className="flex flex-shrink-0 items-center sm:after:hidden after:mx-2 after:text-gray-200 ">
            <span className="mr-2">1</span>
            Data Pribadi
          </span>
        </li>
        <li
          className={cn(
            "flex w-full items-center",
            (tab === "history" || tab === "employee") && "text-primary-50"
          )}
        >
          <span className="flex flex-shrink-0 items-center">
            <span className="mr-2">2</span>
            Riwayat Pendidikan &amp; Pekerjaan
          </span>
        </li>
        <li
          className={cn(
            "flex w-full items-center justify-end before:content-[''] before:w-full before:h-1 before:border-b before:border-gray-200 before:inline-block before:mx-6 xl:before:mx-10",
            tab === "employee" && "text-primary-50 before:border-primary/25"
          )}
        >
          <span className="flex flex-shrink-0 items-center justify-end">
            <span className="mr-2">3</span>
            Kepegawaian
          </span>
        </li>
      </ol>
    </div>
  );
}
