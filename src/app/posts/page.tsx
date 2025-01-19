import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import CreatePostDialog from "./_components/CreatePost";
import Posts from "./_components/Posts";

export default async function PostsPage() {
  return (
    <div className="mx-auto max-w-screen-sm p-1">
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
          <CardDescription>
            Posts from the database. (artificial 3s delay)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Posts />
        </CardContent>
      </Card>
    </div>
  );
}
