import { toastError, toastSuccess } from "@/components/ui/toast";
import { useBusinessRoleDeleteMutation } from "@/redux/api/business/business/role-api";
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

export default function RoleDelete() {
  // Hooks
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  // RTK Query
  const [deleteRole, { isLoading }] = useBusinessRoleDeleteMutation();

  const doDelete = async () => {
    if (!id) return;

    await deleteRole(id)
      .unwrap()
      .then((response) => {
        toastSuccess(response?.message || "Hak akses berhasil dihapus");
        closeModal();
      })
      .catch((rejected: { message?: string; data?: ApiResponse<unknown> }) => {
        toastError(
          rejected?.data?.message || "Terjadi kesalahan ketika menghapus data"
        );
      });
  };

  const closeModal = () => navigate(location.state.previousLocation);

  return (
    <Dialog open={true} onOpenChange={() => closeModal()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hapus Hak Akses</DialogTitle>
          <p className="pt-5">
            Apakah anda yakin untuk menghapus hak akses ini ?
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
            variant={"destructive"}
            type="submit"
            className="w-full"
            disabled={isLoading}
            onClick={() => doDelete()}
          >
            {isLoading ? (
              <LucideLoader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              "Hapus"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
