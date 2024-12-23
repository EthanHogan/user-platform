import { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
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
    <div className="p-1">
      <Card>
        <CardHeader>
          <CardTitle>Posts</CardTitle>
          <CardDescription>All posts from the database.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Id</TableHead>
                <TableHead>Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <Suspense
                fallback={
                  /* load 10 skeleton rows */
                  Array.from({ length: 10 }).map((_, index) => (
                    <TableRow key={"posts_skeleton-" + index}>
                      <TableCell>
                        <Skeleton className="h-5 w-[80px]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                    </TableRow>
                  ))
                }
              >
                <Posts />
              </Suspense>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
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
