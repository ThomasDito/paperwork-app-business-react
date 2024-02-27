import { useBusinessMemberApplicationGetQuery } from "@/redux/api/business/member/application-api";
import { LucideAppWindow, LucideExternalLink } from "lucide-react";
import { Button } from "paperwork-ui";
import { Link } from "react-router-dom";

export default function MemberApplicationIndex() {
  // RTK Query
  const { data: applications = [], isSuccess } =
    useBusinessMemberApplicationGetQuery();

  return (
    <div>
      {isSuccess && (
        <div>
          <h3 className="text-2xl font-semibold tracking-tight scroll-m-20 mb-5">
            Aplikasi
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {applications.map((application) => {
              return (
                <div
                  key={application.id}
                  className="rounded-md shadow-sm bg-card"
                >
                  <div className="p-4 flex items-center space-x-4">
                    <div className="flex items-center p-3 bg-primary/5 rounded-full">
                      <LucideAppWindow className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex flex-col space-y-0.5 w-full">
                      <div className="font-bold text-lg">
                        {application.application_name}
                      </div>
                      <div className="text-muted-foreground text-xs">
                        Terpasang
                      </div>
                    </div>
                  </div>
                  <div className="border-t pt-5 p-4 text-muted-foreground text-sm min-h-[130px]">
                    {application.application_description}
                  </div>
                  <div className="p-4 py-4 flex justify-center border-t w-full bg-accent/30">
                    <Link
                      to={`/${application.application_path}`}
                      target="_blank"
                      className="w-full"
                    >
                      <Button className="w-full">
                        <LucideExternalLink className="mr-2 w-4 h-4" /> Buka
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
