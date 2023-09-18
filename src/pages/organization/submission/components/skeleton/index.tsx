import { Skeleton, TableCell, TableRow } from "paperwork-ui";

export default function OrganizationSubmissionIndexSkeleton() {
  return [...Array(5)].map((_, i) => {
    return (
      <TableRow key={i}>
        <TableCell className="p-5">
          <div className="flex items-center space-x-4">
            <Skeleton className="rounded-full w-11 h-11" />
            <div className="flex flex-col flex-1 space-y-2">
              <Skeleton className="h-[15px] w-[220px]" />
              <Skeleton className="h-[15px] w-[150px]" />
            </div>
          </div>
        </TableCell>
        <TableCell className="p-5">
          <Skeleton className="h-[15px] w-[100px]" />
        </TableCell>
        <TableCell className="p-5">
          <Skeleton className="h-[15px] w-[200px]" />
        </TableCell>
        <TableCell className="p-5">
          <Skeleton className="h-[15px] w-full" />
        </TableCell>
        <TableCell className="p-5">
          <Skeleton className="h-[15px] w-full" />
        </TableCell>
        <TableCell className="p-5 text-center">
          <Skeleton className="mx-auto h-[15px] w-[50px]" />
        </TableCell>
      </TableRow>
    );
  });
}
