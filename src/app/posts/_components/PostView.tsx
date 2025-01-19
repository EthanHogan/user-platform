import { TableCell, TableRow } from "~/components/ui/table";
import { type Post } from "~/server/db/schema";

export default function PostView({ post }: { post: Post }) {
  return (
    <TableRow>
      <TableCell>{post.content}</TableCell>
    </TableRow>
  );
}
