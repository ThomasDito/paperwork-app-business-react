import {  useParams } from "react-router-dom";
import { ScrollArea, ScrollBar, Tabs, TabsContent, TabsList, TabsTrigger } from "paperwork-ui";
import UserTabIndex from "@/pages/user/tabs/user";
import OrganizationTabIndex from "@/pages/user/tabs/organization";
import SecurityTabIndex from "@/pages/user/tabs/security";
import { useShowUserQuery } from "@/redux/api/superadmin/manage-user/user-api";
import LoadingPage from "@/components/loading-page";
import ErrorPage from "@/components/error-page";
import SessionTabIndex from "@/pages/user/tabs/session";

export default function UserShow() {
  // Hooks
  const { id } = useParams();

  // RTK Query
  const { data: user, isFetching, isLoading, error } = useShowUserQuery(id);

  if (error) {
    const { data } = error as { data: ApiResponse<unknown> };
    const message = data?.message || "Terjadi kesalahan teknis. Silahkan coba kembali";

    return <ErrorPage message={message} />;
  }

  if (isLoading || isFetching || !user) return <LoadingPage />;

  return (
    <>
      <div className="my-0">
        <Tabs defaultValue="user">
          <ScrollArea className="py-3 md:py-0">
            <ScrollBar orientation="horizontal" />
            <TabsList className="px-0 bg-transparent">
              <TabsTrigger value="user">Data Pengguna</TabsTrigger>
              <TabsTrigger value="organization">Organisasi</TabsTrigger>
              <TabsTrigger value="security">Keamanan</TabsTrigger>
              <TabsTrigger value="session">Sesi</TabsTrigger>
            </TabsList>
          </ScrollArea>
          <TabsContent value="user">
            <UserTabIndex />
          </TabsContent>
          <TabsContent value="organization">
            <OrganizationTabIndex />
          </TabsContent>
          <TabsContent value="security">
            <SecurityTabIndex />
          </TabsContent>
          <TabsContent value="session">
            <SessionTabIndex />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
