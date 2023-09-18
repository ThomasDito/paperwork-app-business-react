export default function BadgeReviewStatus({
  organization_review_status,
}: {
  organization_review_status: organization_review_status;
}) {
  if (organization_review_status === "accepted") {
    return (
      <span className="px-3.5 py-1.5 text-xs rounded-full border border-green-500 text-green-500">
        Disetujui
      </span>
    );
  } else if (organization_review_status === "revised") {
    return (
      <span className="px-3.5 py-1.5 text-xs rounded-full border border-amber-500 text-amber-500">
        Revisi
      </span>
    );
  } else {
    return (
      <span className="px-3.5 py-1.5 text-xs rounded-full border border-destructive text-destructive">
        Ditolak
      </span>
    );
  }
}
