import { organization_status } from "@/types/schema";

export default function BadgeStatus({
  organization_status,
}: {
  organization_status: organization_status;
}) {
  if (organization_status === "active") {
    return (
      <span className="px-3.5 py-1.5 text-xs rounded-full border border-green-500 text-green-500">
        Aktif
      </span>
    );
  } else if (organization_status === "inactive") {
    return (
      <span className="px-3.5 py-1.5 text-xs rounded-full border border-primary text-primary">
        Tidak Aktif
      </span>
    );
  } else if (organization_status === "revised") {
    return (
      <span className="px-3.5 py-1.5 text-xs rounded-full border border-amber-500 text-amber-500">
        Revisi
      </span>
    );
  } else if (organization_status === "declined") {
    return (
      <span className="px-3.5 py-1.5 text-xs rounded-full border border-destructive text-destructive">
        Ditolak
      </span>
    );
  } else {
    return (
      <span className="px-3.5 py-1.5 text-xs rounded-full border border-sky-500 text-sky-500">
        Review
      </span>
    );
  }
}
