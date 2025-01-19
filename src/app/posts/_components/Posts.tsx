"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import usePostsData from "../hooks/usePostsData";
import PostView from "./PostView";

export default function Posts() {
  const {
    query: { data, isPending },
  } = usePostsData();

  const posts = data ?? [];

  return (
    <div className="flex w-full flex-col gap-4">
      {isPending && <LoadingFallback key="fetching" />}
      {posts.map((post, index) => (
        <PostView key={`post-${index}`} post={post} />
      ))}
    </div>
  );
}

const LoadingFallback = () => (
  <Card>
    <CardHeader>
      <CardTitle>
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-36" />
        </div>
      </CardTitle>
      <CardDescription></CardDescription>
    </CardHeader>
    <CardContent>
      <Skeleton className="h-5 w-full" />
    </CardContent>
  </Card>
);
