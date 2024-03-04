import { toastError, toastSuccess } from "@/components/ui/toast";
import { useBusinessMemberResendInvitationMutation } from "@/redux/api/business/business/member-api";
import { LucideLoader2 } from "lucide-react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "paperwork-ui";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function MemberResend() {
  // Hooks
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  // RTK Query
  const [resendInvitation, { isLoading }] =
    useBusinessMemberResendInvitationMutation();

  const doResend = async () => {
    if (!id) return;

    await resendInvitation(id)
      .unwrap()
      .then((response) => {
        toastSuccess(response?.message || "Undangan baru berhasil dikirimkan");
        closeModal();
      })
      .catch((rejected: { message?: string; data?: ApiResponse<unknown> }) => {
        toastError(
          rejected?.data?.message ||
            "Terjadi kesalahan ketika mengirim undangan"
        );
      });
  };

  const closeModal = () => navigate(location.state.previousLocation);

  return (
    <Dialog open={true} onOpenChange={() => closeModal()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Kirim Undangan</DialogTitle>
          <p className="pt-5">
            Apakah anda yakin untuk mengirim undangan baru untuk anggota ini ?
          </p>
        </DialogHeader>
        <DialogFooter className="pt-8">
          <Button
            className="w-full mt-2 mr-1 bg-card sm:mt-0"
            type="button"
            variant={"outline"}
            onClick={() => closeModal()}
          >
            Batal
          </Button>
          <Button
            size={"default"}
            type="submit"
            className="w-full"
            disabled={isLoading}
            onClick={() => doResend()}
          >
            {isLoading ? (
              <LucideLoader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              "Kirim"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
