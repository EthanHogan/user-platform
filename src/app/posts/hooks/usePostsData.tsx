"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import getPosts from "../_actions/getPosts";
import submitPost from "../_actions/submitPost";
import { NewPost } from "~/server/db/schema";

export default function usePostsData() {
  const { data, refetch, isRefetching } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(),
  });

  const { mutate, mutateAsync } = useMutation({
    mutationFn: (newPost: NewPost) => submitPost(newPost),
    onSuccess: () => {
      void refetch();
    },
  });

  return {
    data,
    refetch,
    mutate,
    mutateAsync,
    isRefetching,
  };
}
