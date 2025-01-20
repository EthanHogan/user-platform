"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "~/hooks/use-toast";
import { type NewPost, type Post } from "~/server/db/schema";
import getPosts from "../_actions/getPosts";
import submitPost from "../_actions/submitPost";

export default function usePostsData() {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const query = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(),
  });

  const mutation = useMutation({
    mutationFn: (newPost: NewPost) => submitPost(newPost),
    onMutate: async (newPost: NewPost) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      // Snapshot the previous value
      const previousPosts = queryClient.getQueryData(["posts"]);

      // Optimistically update to the new value
      queryClient.setQueryData(
        ["posts"],
        (old: Post[]) =>
          [
            {
              ...newPost,
              created_at: new Date(),
            },
            ...old,
          ] satisfies (Post | NewPost)[],
      );

      // Return a context object with the snapshotted value
      return { previousPosts };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, newTodo, context) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create post. Please try again.",
      });
      queryClient.setQueryData(["posts"], context?.previousPosts);
    },
    // Always refetch after error or success:
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return {
    query,
    mutation,
  };
}
