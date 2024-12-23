import { Suspense } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { db } from "~/server/db";

export default function PostsPage() {
  return (
    <div className="border border-green-500 p-1">
      <h2 className="text-xl">Posts Page</h2>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <Suspense
            fallback={
              <tr>
                <td>Loading...</td>
              </tr>
            }
          >
            <Posts />
          </Suspense>
        </TableBody>
      </Table>
    </div>
  );
}

const Posts = async () => {
  const posts = await db.query.posts.findMany();

  // wait 3 seconds
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return posts.map((post) => (
    <TableRow key={post.id}>
      <TableCell className="font-medium">{post.id}</TableCell>
      <TableCell>{post.name}</TableCell>
    </TableRow>
  ));
};
