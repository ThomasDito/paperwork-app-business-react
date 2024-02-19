import { useBusinessMemberApplicationGetQuery } from "@/redux/api/business/member/application-api";
import { LucideExternalLink } from "lucide-react";
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {applications.map((application) => {
              return (
                <div
                  key={application.id}
                  className="rounded-md shadow-sm bg-card"
                >
                  <div className="p-5 pt-8 flex justify-center">
                    <div className="border rounded-md">
                      {/* <img
                        src="https://cdn.paperwork.local/961ce5b7-ab59-4881-b9a0-51f6e7aac8e8.png"
                        alt="logo"
                        className="m-2 w-24 h-24 object-cover"
                      /> */}
                      <div className="m-2 w-24 h-24 bg-muted rounded-full"></div>
                    </div>
                  </div>
                  <div className="p-5 pt-2 pb-7 flex flex-col text-center space-y-1">
                    <div className="font-bold text-lg">
                      {application.application_name}
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {application.application_description}
                    </div>
                  </div>
                  <div className="p-5 py-4 flex justify-center border-t">
                    <Link
                      to={`/${application.application_path}`}
                      target="_blank"
                    >
                      <Button>
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
