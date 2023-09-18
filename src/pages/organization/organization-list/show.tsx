import ErrorPage from "@/components/error-page";
import LoadingPage from "@/components/loading-page";
import { useShowOrganizationQuery } from "@/redux/api/superadmin/manage-organization/organization-api";
import { Link, useParams } from "react-router-dom";
import { ScrollArea, ScrollBar, Tabs, TabsContent, TabsList, TabsTrigger } from "paperwork-ui";
import OrganizationDataTab from "@/pages/organization/organization-list/components/tabs/organization-data";
import OrganizationPicTab from "@/pages/organization/organization-list/components/tabs/organization-pic";
import ReviewHistoryTab from "@/pages/organization/organization-list/components/tabs/review-history";
import { LucideChevronRight } from "lucide-react";

export default function OrganizationListShow() {
  // Hooks
  const { id } = useParams();

  // RTK Query
  const { data: organization, isFetching, isLoading, error } = useShowOrganizationQuery(id);

  // States

  if (error) {
    const { data } = error as { data: ApiResponse<unknown> };
    const message = data?.message || "Terjadi kesalahan teknis. Silahkan coba kembali";

    return <ErrorPage message={message} />;
  }

  if (isLoading || isFetching || !organization) return <LoadingPage />;

  return (
    <>
      <div className="flex-1">
        <Tabs defaultValue="organization-data">
          <ScrollArea className="py-3 md:py-0">
            <ScrollBar orientation="horizontal" />
            <TabsList className="bg-transparent">
              <TabsTrigger value="organization-data">Data Organisasi</TabsTrigger>
              <TabsTrigger value="organization-member">Anggota</TabsTrigger>
              <TabsTrigger value="organization-app">Aplikasi</TabsTrigger>
              <TabsTrigger value="organization-pic">Penanggung Jawab</TabsTrigger>
              <TabsTrigger value="review-history">Riwayat Peninjauan</TabsTrigger>
            </TabsList>
          </ScrollArea>
          <TabsContent value="organization-data">
            <OrganizationDataTab organization={organization} />
          </TabsContent>
          <TabsContent value="organization-pic">
            <OrganizationPicTab organization={organization} />
          </TabsContent>
          <TabsContent value="review-history">
            <ReviewHistoryTab organization={organization} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
