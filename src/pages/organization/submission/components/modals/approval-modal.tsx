import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Button,
  Textarea,
  cn,
} from "paperwork-ui";
import { toastError, toastSuccess } from "@/components/ui/toast";
import {
  useApprovalOrganizationMutation,
  useLazyShowOrganizationQuery,
} from "@/redux/api/superadmin/manage-organization/organization-api";
import { Form, Formik } from "formik";
import { withZodSchema } from "formik-validator-zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

type Props = {
  organization_id: string;
  status: organization_review_status;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const formSchema = z.object({
  organization_id: z.string(),
  organization_review_status: z.string(),
  organization_review_message: z.string().min(1, "Harus diisi").trim(),
});

export type ApprovalSchema = z.infer<typeof formSchema>;

export default function ApprovalModal({
  isOpen,
  setIsOpen,
  organization_id,
  status,
}: Props) {
  const [approvalOrganization, { isLoading }] =
    useApprovalOrganizationMutation();

  const [refetchOrganization] = useLazyShowOrganizationQuery();

  const [initialValues] = useState<ApprovalSchema>({
    organization_id,
    organization_review_message: "",
    organization_review_status: status,
  });

  const onSubmit = async (values: ApprovalSchema) => {
    await approvalOrganization(values)
      .unwrap()
      .then((response) => {
        refetchOrganization(organization_id);
        toastSuccess(
          response?.message || "Pengajuan organisasi berhasil ditinjau"
        );
        setIsOpen(false);
      })
      .catch((rejected: { message?: string; data?: ApiResponse<unknown> }) => {
        toastError(
          rejected?.data?.message || "Terjadi kesalahan ketika menyimpan data"
        );
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={withZodSchema(formSchema)}
      onSubmit={onSubmit}
      enableReinitialize={true}
    >
      {(formik) => {
        return (
          <Form>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Tulis Keterangan Peninjauan</DialogTitle>
                  <div className="py-5">
                    <Textarea
                      value={formik.values.organization_review_message}
                      onChange={(e) =>
                        formik.setFieldValue(
                          "organization_review_message",
                          e.target.value
                        )
                      }
                      onBlur={(e) =>
                        formik.setFieldValue(
                          "organization_review_message",
                          e.target.value
                        )
                      }
                      rows={15}
                      className={cn(
                        "max-h-96",
                        formik.errors.organization_review_message &&
                          "border border-destructive ring-destructive focus-visible:ring-0"
                      )}
                    />
                    <p className="mt-2 text-xs text-destructive">
                      {formik.errors.organization_review_message}
                    </p>
                  </div>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    className="w-full mt-2 mr-1 bg-card sm:mt-0"
                    type="button"
                    variant={"outline"}
                    onClick={() => setIsOpen(false)}
                  >
                    Batal
                  </Button>
                  <Button
                    size={"default"}
                    type="submit"
                    className="w-full"
                    disabled={isLoading || !(formik.dirty && formik.isValid)}
                    onClick={() => formik.submitForm()}
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <>
                        {status == "accepted" && "Setujui"}
                        {status == "declined" && "Tolak"}
                        {status == "revised" && "Revisi"}
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </Form>
        );
      }}
    </Formik>
  );
}
