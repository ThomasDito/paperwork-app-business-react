import { useBusinessApplicationGetQuery } from "@/redux/api/business/application-api";
import { useAppSelector } from "@/redux/hooks";
import { selectOrganization } from "@/redux/slices/auth-slice";
import { application } from "@/types/schema";
import { LucideDownloadCloud, LucideExternalLink } from "lucide-react";
import { Button, Tabs, TabsList, TabsTrigger } from "paperwork-ui";
import { useCallback, useState, useTransition } from "react";
import { Link, useLocation } from "react-router-dom";

type TabType = "all" | "installed" | "not-installed";

export default function ApplicationIndex() {
  // Hooks
  const location = useLocation();
  const organization = useAppSelector(selectOrganization);

  // States
  const [tab, setTab] = useState<TabType>("all");
  const [, startTransition] = useTransition();

  // RTK Query
  const { data: applications = [], isSuccess } =
    useBusinessApplicationGetQuery(tab);

  // Actions
  const selectTab = (tab: TabType) => {
    startTransition(() => {
      setTab(tab);
    });
  };

  const isInstalled = useCallback(
    (application: application) => {
      return application.organization_applications.find(
        (item) => item.organization_id === organization?.id
      )
        ? true
        : false;
    },
    [applications, organization]
  );

  return (
    <div>
      <div className="mb-8">
        <Tabs
          value={tab}
          onValueChange={(value) => selectTab(value as TabType)}
          className="w-[400px]"
        >
          <TabsList className="bg-transparent">
            <TabsTrigger value="all">Semua Aplikasi</TabsTrigger>
            <TabsTrigger value="installed">Terpasang</TabsTrigger>
            <TabsTrigger value="not-installed">Belum Dipasang</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {isSuccess && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {applications.map((application) => {
              return (
                <div
                  key={application.id}
                  className="border rounded-md shadow-sm bg-card"
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
                    {isInstalled(application) ? (
                      <Link
                        to={`/${application.application_path}`}
                        target="_blank"
                      >
                        <Button>
                          <LucideExternalLink className="mr-2 w-4 h-4" /> Buka
                        </Button>
                      </Link>
                    ) : (
                      <Link
                        to={`/modal/application/install/${application.id}`}
                        state={{ previousLocation: location }}
                      >
                        <Button variant="outline">
                          <LucideDownloadCloud className="mr-2 w-4 h-4" />
                          Pasang
                        </Button>
                      </Link>
                    )}
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
