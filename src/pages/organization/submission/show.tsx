import { useState } from "react";
import ErrorPage from "@/components/error-page";
import LoadingPage from "@/components/loading-page";
import { useDeleteSubmissionOrganizationMutation, useShowOrganizationQuery } from "@/redux/api/superadmin/manage-organization/organization-api";
import { useNavigate, useParams } from "react-router-dom";
import OrganizationDataTab from "@/pages/organization/submission/components/tabs/organization-data";
import OrganizationPicTab from "@/pages/organization/submission/components/tabs/organization-pic";
import ReviewHistoryTab from "@/pages/organization/submission/components/tabs/review-history";
import { Button, Alert, AlertDescription, AlertTitle, Tabs, TabsContent, TabsList, TabsTrigger, ScrollArea, ScrollBar } from "paperwork-ui";
import { LucideAlertTriangle, LucideBan, LucideCheckCircle, LucideFileWarning, LucideTrash } from "lucide-react";
import ApprovalModal from "@/pages/organization/submission/components/modals/approval-modal";
import ModalConfirmation from "@/components/ui/modal-confirmation";
import { toastError, toastSuccess } from "@/components/ui/toast";

export default function OrganizationSubmissionShow() {
  // Hooks
  const navigate = useNavigate();
  const { id } = useParams();

  // RTK Query
  const { data: organization, isFetching, isLoading, error } = useShowOrganizationQuery(id);

  const [deleteOrganization, { isLoading: deleteOrganizationIsLoading }] = useDeleteSubmissionOrganizationMutation();

  // States
  const [approvalModalIsOpen, setApprovalModalIsOpen] = useState<boolean>(false);

  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState<boolean>(false);

  const [status, setStatus] = useState<organization_review_status>("accepted");

  // Actions
  const doDelete = async () => {
    setDeleteModalIsOpen(false);

    await deleteOrganization(id!)
      .unwrap()
      .then(
        (response) => {
          toastSuccess(response?.message || "Pengajuan organisasi berhasil dihapus");
          navigate(`/organization/submission`);
        },
        (rejected: { data: ApiResponse<unknown> }) => {
          toastError(rejected?.data?.message || "Terjadi kesalahan teknis. Silahkan coba kembali");
        }
      );
  };

  if (error) {
    const { data } = error as { data: ApiResponse<unknown> };
    const message = data?.message || "Terjadi kesalahan teknis. Silahkan coba kembali";

    return <ErrorPage message={message} />;
  }

  if (isLoading || isFetching || deleteOrganizationIsLoading || !organization) return <LoadingPage />;

  return (
    <>
      {approvalModalIsOpen && (
        <ApprovalModal isOpen={approvalModalIsOpen} setIsOpen={setApprovalModalIsOpen} status={status} organization_id={organization.id} />
      )}

      {organization.organization_status == "declined" && (
        <>
          {deleteModalIsOpen && (
            <ModalConfirmation
              isOpen={deleteModalIsOpen}
              setIsOpen={setDeleteModalIsOpen}
              title="Hapus Pengajuan Organisasi"
              description="Apakah anda yakin untuk menghapus form pengajuan organisasi ini ?"
              actionText="Hapus"
              action={doDelete}
            />
          )}

          <Alert variant="destructive" className="mb-4 bg-destructive/5">
            <div className="flex flex-col items-start justify-center space-y-4 md:items-center md:space-y-0 md:space-x-5 md:flex-row">
              <div className="flex items-center flex-1 space-x-3">
                <LucideAlertTriangle className="w-4 h-4" />
                <div>
                  <AlertTitle>Pengajuan Ditolak</AlertTitle>
                  <AlertDescription>Pengajuan untuk organisasi ini telah ditolak</AlertDescription>
                </div>
              </div>
              <div
                onClick={() => {
                  setDeleteModalIsOpen(true);
                }}
                className="flex items-center justify-center cursor-pointer hover:underline"
              >
                <LucideTrash className="w-4 h-4 mr-2" /> Hapus Pengajuan
              </div>
            </div>
          </Alert>
        </>
      )}

      {(organization.organization_status == "active" || organization.organization_status == "inactive") && (
        <Alert variant="default" className="mb-6 text-green-600 bg-green-50">
          <LucideCheckCircle className="h-4 w-4 !text-green-600" />
          <AlertTitle>Pengajuan Disetujui</AlertTitle>
          <AlertDescription>Pengajuan untuk organisasi ini telah disetujui</AlertDescription>
        </Alert>
      )}

      <div className="flex items-center justify-end">
        {(organization.organization_status === "in_review" || organization.organization_status === "revised") && (
          <div className="flex items-center space-x-3">
            <Button
              variant={"outline"}
              className="bg-card"
              onClick={() => {
                setStatus("accepted");
                setApprovalModalIsOpen(true);
              }}
            >
              <LucideCheckCircle className="w-4 h-4 mr-2 text-green-600" /> Setujui
            </Button>
            <Button
              variant={"outline"}
              className="bg-card"
              onClick={() => {
                setStatus("revised");
                setApprovalModalIsOpen(true);
              }}
            >
              <LucideFileWarning className="w-4 h-4 mr-2 text-amber-600" /> Revisi
            </Button>
            <Button
              variant={"outline"}
              className="bg-card"
              onClick={() => {
                setStatus("declined");
                setApprovalModalIsOpen(true);
              }}
            >
              <LucideBan className="w-4 h-4 mr-2 text-destructive" />
              Tolak
            </Button>
          </div>
        )}
      </div>
      <div className="">
        <Tabs defaultValue="organization-data">
          <ScrollArea className="py-3 md:py-0">
            <ScrollBar orientation="horizontal" />
            <TabsList className="px-0 bg-transparent">
              <TabsTrigger value="organization-data">Data Organisasi</TabsTrigger>
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
