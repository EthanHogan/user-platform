import { Suspense } from "react";
import { unstable_cache } from "next/cache";

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

export default async function PostsPage() {
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
              <Posts />
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

const Posts = async () => {
  const getCachedPosts = unstable_cache(
    async () => getPosts(),
    ["posts"],
    { revalidate: 60 }, // Cache for 60 seconds
  );
  const posts = await getCachedPosts();

  return <PostsView posts={posts} />;
};
