"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { SignInButton, useAuth } from "@clerk/nextjs";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { postsInsertSchema } from "~/server/db/schema";
import usePostsData from "../hooks/usePostsData";

const formSchema = postsInsertSchema.pick({ content: true });

export default function CreatePostDialog() {
  const [open, setOpen] = useState(false);
  const { userId } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const {
    mutation: { mutateAsync },
  } = usePostsData();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!userId) {
      return;
    }

    void mutateAsync({
      user_id: userId,
      content: values.content,
    });

    form.reset();
    setOpen(false);
  }

  if (!userId) {
    return (
      <SignInButton>
        <Button variant="outline">+</Button>
      </SignInButton>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">+</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
          <DialogDescription>
            Create a new post. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="content"
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel>New Post</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="New Post Here..."
                      disabled={formState.isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>This is your new post.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                Create Post
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
