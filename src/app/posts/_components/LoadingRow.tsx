import { Skeleton } from "~/components/ui/skeleton";
import { TableCell, TableRow } from "~/components/ui/table";

export default function LoadingRow() {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="h-5 w-[80px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-5 w-full" />
      </TableCell>
    </TableRow>
  );
}
