import { toastError, toastSuccess } from "@/components/ui/toast";
import { useBusinessApplicationInstallMutation } from "@/redux/api/business/application-api";
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

export default function ApplicationInstall() {
  // Hooks
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  // RTK Query
  const [installApplication, { isLoading }] =
    useBusinessApplicationInstallMutation();

  const doInstall = async () => {
    if (!id) return;

    await installApplication(id)
      .unwrap()
      .then((response) => {
        toastSuccess(response?.message || "Pemasangan aplikasi berhasil");
        closeModal();
      })
      .catch((rejected: { message?: string; data?: ApiResponse<unknown> }) => {
        toastError(
          rejected?.data?.message ||
            "Terjadi kesalahan ketika memasang aplikasi"
        );
      });
  };

  const closeModal = () => navigate(location.state.previousLocation);

  return (
    <Dialog open={true} onOpenChange={() => closeModal()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pasang Aplikasi</DialogTitle>
          <p className="pt-5">
            Apakah anda yakin untuk memasang aplikasi ini ?
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
            onClick={() => doInstall()}
          >
            {isLoading ? (
              <LucideLoader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              "Pasang"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
