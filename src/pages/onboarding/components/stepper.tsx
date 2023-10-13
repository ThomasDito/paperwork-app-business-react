import { Tabs } from "@/pages/onboarding";

export default function OnboardingStepper({ tabs }: { tabs: Tabs }) {
  return (
    <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 sm:text-base">
      <li
        className={`flex md:w-full items-center sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 ${
          tabs === "division" && "text-primary"
        }`}
      >
        <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 ">
          Buat <span className="hidden sm:inline-flex sm:ml-2">Divisi</span>
        </span>
      </li>
      <li
        className={`flex md:w-full items-center sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 ${
          tabs === "position" && "text-primary"
        }`}
      >
        <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 ">
          Buat <span className="hidden sm:inline-flex sm:ml-2">Jabatan</span>
        </span>
      </li>
      <li
        className={`flex md:w-full items-center sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 ${
          tabs === "level" && "text-primary"
        }`}
      >
        <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 ">
          Buat <span className="hidden sm:inline-flex sm:ml-2">Level</span>
        </span>
      </li>
      <li className="flex items-center">
        Tambah <span className="hidden sm:inline-flex sm:ml-2">Karyawan</span>
      </li>
    </ol>
  );
}
