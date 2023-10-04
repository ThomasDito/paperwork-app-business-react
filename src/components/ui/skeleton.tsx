import { Skeleton, TableCell, TableRow } from "paperwork-ui";

export default function TableSkeleton({
  columns,
  rows = 10,
}: {
  columns: number;
  rows?: number;
}) {
  return [...Array(rows)].map((_, i) => {
    return (
      <TableRow key={i}>
        {[...Array(columns)].map((_, j) => {
          return (
            <TableCell key={j} className="p-5">
              <Skeleton className="mx-auto h-[15px] w-[150px]" />
            </TableCell>
          );
        })}
      </TableRow>
    );
  });
}
