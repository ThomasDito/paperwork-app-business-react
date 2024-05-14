import { useLazyBusinessMemberInformationGetQuery } from "@/redux/api/business/member/information-api";
import { LucideCalendar } from "lucide-react";
import moment from "moment-timezone";
import { Tabs, TabsList, TabsTrigger } from "paperwork-ui";
import { useEffect, useState, useTransition } from "react";
import { Link } from "react-router-dom"; // Import Link untuk membuat breadcrumb

export default function UserInformationIndex() {
  //RTK Query
  const [getInformations, { data: informations }] =
    useLazyBusinessMemberInformationGetQuery();

  //States
  const [type, setType] = useState<"active" | "history">("active");
  const [, startTransition] = useTransition();

  //Actions
  const selectTab = (type: "active" | "history") => {
    startTransition(() => {
      setType(type);
    });
  };

  useEffect(() => {
    if (type) {
      const date = moment().format("YYYY-MM-DD");
      getInformations({
        date,
        type,
      });
    }
  }, [type]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm font-medium" aria-label="Breadcrumb">
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
            <Link to="/member/information/information" className="text-gray-400 hover:text-gray-500">
              Informasi
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
            <span className="text-gray-500">Pengumuman</span>
          </li>
        </ol>
      </nav>
      
      {/* Tabs */}
      <Tabs value={type} onValueChange={(value) => selectTab(value as "active" | "history")} className="flex justify-center">
        <TabsList className="flex bg-gradient-to-r from-pink-400 to-purple-500 rounded-md overflow-hidden">
          <TabsTrigger value="active" className={`px-6 py-3 ${type === "active" ? "bg-white text-gray-800" : "text-white"}`}>Sedang Tayang</TabsTrigger>
          <TabsTrigger value="history" className={`px-6 py-3 ${type === "history" ? "bg-white text-gray-800" : "text-white"}`}>Riwayat</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {/* Information Cards */}
      <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {informations &&
          informations.map((information, index) => (
            <div key={index} className={`bg-gradient-to-r from-${type === "active" ? "pink" : "purple"}-200 to-${type === "active" ? "pink" : "purple"}-300 rounded-lg shadow-lg overflow-hidden`}>
              <div className="px-6 py-4">
                <div className={`font-bold text-xl mb-2 ${type === "active" ? "text-pink-600" : "text-purple-600"}`}>{information.information_title}</div>
                <p className="text-gray-700 text-base">{information.information_content}</p>
              </div>
              <div className="px-6 py-4">
                <div className="flex items-center">
                  <LucideCalendar className={`w-6 h-6 mr-2 ${type === "active" ? "text-pink-600" : "text-purple-600"}`} />
                  <span className="text-sm text-gray-600">{moment(information.information_start_date).format("DD MMMM YYYY")}</span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
