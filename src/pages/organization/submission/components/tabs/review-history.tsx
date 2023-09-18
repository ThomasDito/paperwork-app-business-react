import BadgeReviewStatus from "@/components/ui/badge-review-status";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Button } from "paperwork-ui";
import ReviewDetailModal from "@/pages/organization/submission/components/modals/review-detail-modal";
import { LucideEye, LucideFileCheck2 } from "lucide-react";
import moment from "moment";
import { useState } from "react";

export default function ReviewHistoryTab({ organization }: { organization: showOrganizationResult }) {
  // States
  const [detailModalIsOpen, setDetailModalIsOpen] = useState<boolean>(false);

  const [text, setText] = useState<string>("");

  return (
    <>
      {detailModalIsOpen && <ReviewDetailModal text={text} isOpen={detailModalIsOpen} setIsOpen={setDetailModalIsOpen} />}
      <div className="py-2">
        <div className="rounded-md shadow bg-card">
          <div className="flex items-center justify-between p-5 py-5 border-b">
            <div className="flex items-center font-semibold">
              <LucideFileCheck2 className="w-4 h-4 mr-2" /> Riwayat Peninjauan
            </div>
          </div>
          <div className="p-0">
            <Table className="">
              <TableHeader>
                <TableRow>
                  <TableHead className="px-5 py-4">Tanggal</TableHead>
                  <TableHead className="px-5 py-4 text-center">Status</TableHead>
                  <TableHead className="px-5 py-4">Petugas</TableHead>
                  <TableHead className="px-5 py-4">Keterangan</TableHead>
                  <TableHead className="px-5 py-4">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-sm">
                {organization.organization_reviews.map((review) => {
                  return (
                    <TableRow key={review.id}>
                      <TableCell className="p-5 whitespace-nowrap">{moment(review.created_at).format("DD MMMM YYYY HH:mm")}</TableCell>
                      <TableCell className="p-5 text-center">
                        <BadgeReviewStatus organization_review_status={review.organization_review_status} />
                      </TableCell>
                      <TableCell className="p-5">{review.user.user_fullname ?? "-"}</TableCell>
                      <TableCell className="p-5">
                        <div className="line-clamp-1">{review.organization_review_message ?? "-"}</div>
                      </TableCell>
                      <TableCell className="p-5">
                        <Button
                          variant={"ghost"}
                          className="w-8 h-8 p-0"
                          onClick={() => {
                            setText(review.organization_review_message);
                            setDetailModalIsOpen(true);
                          }}
                        >
                          <LucideEye className="w-4 h-4 text-muted-foreground" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}

                {!organization.organization_reviews.length && (
                  <TableRow>
                    <TableCell colSpan={5} className="p-5 text-center">
                      Tidak ada riwayat peninjauan
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
