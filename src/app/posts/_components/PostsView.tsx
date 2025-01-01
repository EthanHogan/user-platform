"use client";

import { TableCell, TableRow } from "~/components/ui/table";
import { type Post } from "~/server/db/schema";
import usePostsData from "../hooks/usePostsData";
import LoadingRow from "./LoadingRow";

export default function PostsView({ posts }: { posts: Post[] }) {
  const { data, isRefetching } = usePostsData();

  const postsData = data ?? posts;

  return (
    <>
      {isRefetching && <LoadingRow key="refetching" />}
      {postsData.map((post) => (
        <TableRow key={post.id}>
          <TableCell className="font-medium">{post.id}</TableCell>
          <TableCell>{post.content}</TableCell>
        </TableRow>
      ))}
    </>
  );
}
