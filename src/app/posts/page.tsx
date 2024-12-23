import { Suspense } from "react";
import { db } from "~/server/db";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Skeleton } from "~/components/ui/skeleton";

import CreatePostDialog from "./_components/create-post";

export const dynamic = "force-dynamic";

export default function PostsPage() {
  return (
    <div className="p-1">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center justify-between">
              <div>Posts</div>
              <div>
                <CreatePostDialog />
              </div>
            </div>
          </CardTitle>
          <CardDescription>Posts from the database.</CardDescription>
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
                key={Date.now()}
                fallback={Array.from({ length: 10 }).map((_, index) => (
                  <TableRow key={"posts_skeleton-" + index}>
                    <TableCell>
                      <Skeleton className="h-5 w-[80px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-full" />
                    </TableCell>
                  </TableRow>
                ))}
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
  const posts = await db.query.posts.findMany({
    orderBy: (model, { desc }) => desc(model.id),
    limit: 15,
  });

  // wait 3 seconds
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return posts.map((post) => (
    <TableRow key={post.id}>
      <TableCell className="font-medium">{post.id}</TableCell>
      <TableCell>{post.content}</TableCell>
    </TableRow>
  ));
};
