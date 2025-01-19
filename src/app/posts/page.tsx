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
import Posts from "./_components/Posts";

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
          <CardDescription>
            Posts from the database. (artificial 3s delay)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Posts</TableHead>
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
