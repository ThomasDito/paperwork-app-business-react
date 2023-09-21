import { Skeleton, TableCell, TableRow } from "paperwork-ui";

export default function DivisionSkeleton() {
  return [...Array(5)].map((_, i) => {
    return (
      <TableRow key={i}>
        <TableCell className="p-5">
          <Skeleton className="h-[15px] w-full" />
        </TableCell>
        <TableCell className="p-5">
          <Skeleton className="mx-auto h-[15px] w-[50px]" />
        </TableCell>
        <TableCell className="p-5 text-center">
          <Skeleton className="mx-auto h-[15px] w-[50px]" />
        </TableCell>
      </TableRow>
    );
  });
}
