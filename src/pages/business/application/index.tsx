import { useBusinessApplicationGetQuery } from "@/redux/api/business/business/application-api";
import { useAppSelector } from "@/redux/hooks";
import { selectOrganization } from "@/redux/slices/auth-slice";
import { application } from "@/types/schema";
import {
  LucideAppWindow,
  LucideDownloadCloud,
  LucideExternalLink,
} from "lucide-react";
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
                        {isInstalled(application)
                          ? "Terpasang"
                          : "Belum Dipasang"}
                      </div>
                    </div>
                  </div>
                  <div className="border-t pt-5 p-4 text-muted-foreground text-sm min-h-[130px]">
                    {application.application_description}
                  </div>
                  <div className="p-4 py-4 flex border-t w-full bg-accent/30">
                    {isInstalled(application) ? (
                      <Link
                        to={`/${application.application_path}`}
                        target="_blank"
                        className="w-full"
                      >
                        <Button className="w-full">
                          <LucideExternalLink className="mr-2 w-4 h-4" /> Buka
                        </Button>
                      </Link>
                    ) : (
                      <Link
                        to={`/modal/application/install/${application.id}`}
                        state={{ previousLocation: location }}
                        className="w-full"
                      >
                        <Button className="w-full" variant="outline">
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
