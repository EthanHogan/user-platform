import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { type Post } from "~/server/db/schema";

export default function PostView({ post }: { post: Post }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            <div>{format(post.created_at, "MM/dd/yyyy hh:mm a")}</div>
          </div>
        </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>{post.content}</CardContent>
    </Card>
  );
}
