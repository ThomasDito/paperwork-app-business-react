import { useLazyBusinessMemberInformationGetQuery } from "@/redux/api/business/member/information-api";
import { LucideCalendar } from "lucide-react";
import moment from "moment-timezone";
import { Tabs, TabsList, TabsTrigger } from "paperwork-ui";
import { useEffect, useState, useTransition } from "react";

export default function UserInformationIndex() {
  // RTK Query
  const [getInformations, { data: informations }] =
    useLazyBusinessMemberInformationGetQuery();

  // States
  const [type, setType] = useState<"active" | "history">("active");
  const [, startTransition] = useTransition();

  // Actions
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
    <div>
      <div className="mb-8">
        <Tabs
          value={type}
          onValueChange={(value) => selectTab(value as "active" | "history")}
          className="w-[400px]"
        >
          <TabsList className="bg-transparent">
            <TabsTrigger value="active">Sedang Tayang</TabsTrigger>
            <TabsTrigger value="history">Riwayat</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="space-y-8">
        {informations &&
          informations.map((information) => {
            return (
              <div
                key={information.id}
                className="bg-card shadow-sm rounded-md"
              >
                <div className="p-5 flex flex-col space-y-2">
                  <h3 className="text-2xl font-semibold tracking-tight scroll-m-20">
                    {information.information_title}
                  </h3>
                  <div className="text-sm flex items-center">
                    <LucideCalendar className="w-4 h-4 mr-2" />{" "}
                    {moment(information.information_start_date).format(
                      "DD MMMM YYYY"
                    )}
                  </div>
                </div>
                <div className="p-5 border-t">
                  {information.information_content}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
