import { Suspense } from "react";

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
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import CreatePostDialog from "./_components/CreatePost";
import PostsView from "./_components/PostsView";
import getPosts from "./_actions/getPosts";
import LoadingRow from "./_components/LoadingRow";

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
                  <LoadingRow key={index} />
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
  const posts = await getPosts();

  return <PostsView posts={posts} />;
};
