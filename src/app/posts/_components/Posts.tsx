"use client";

import { Skeleton } from "~/components/ui/skeleton";
import { TableCell, TableRow } from "~/components/ui/table";
import usePostsData from "../hooks/usePostsData";
import PostView from "./PostView";

export default function Posts() {
  const {
    query: { data, isPending },
  } = usePostsData();

  const posts = data ?? [];

  return (
    <>
      {isPending && <LoadingRow key="fetching" />}
      {posts.map((post, index) => (
        <PostView key={`post-${index}`} post={post} />
      ))}
    </>
  );
}

const LoadingRow = () => (
  <TableRow>
    <TableCell>
      <Skeleton className="h-5 w-full" />
    </TableCell>
  </TableRow>
);
