"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { type ActionResponse } from "~/actions/types/ActionResponse";
import { db } from "~/server/db";
import { type NewPost, posts, postsInsertSchema } from "~/server/db/schema";
import { ratelimit } from "~/server/ratelimit";

export default async function submitPost(
  newPost: NewPost,
): Promise<ActionResponse> {
  console.log("NewPost submitted: ", newPost);

  // check if user is authenticated
  const { userId } = await auth();

  if (!userId) {
    throw new Error("You must be signed in to add an item to your cart");
  }

  if (userId !== newPost.userId) {
    throw new Error("You can only create posts for your own account");
  }

  const { success } = await ratelimit.limit(userId);

  const fullUser = await currentUser();

  if (fullUser?.privateMetadata?.["can-post"] !== true) {
    return {
      success: false,
      message: "You are not allowed to create posts. Account not whitelisted.",
    };
  }

  if (!success) {
    return {
      success: false,
      message: "You have reached the rate limit for creating posts",
    };
  }

  // validate newPost
  const validatedData = postsInsertSchema.safeParse(newPost);
  if (!validatedData.success) {
    console.error(
      "NewPost validation error: ",
      validatedData.error.flatten().fieldErrors,
    );
    return {
      success: false,
      message: "Please fix the errors in the form",
      errors: validatedData.error.flatten().fieldErrors,
    };
  }

  console.log("NewPost validated: ", validatedData.data);

  // simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // insert newPost into the database
  try {
    await db.insert(posts).values(newPost);
  } catch (error) {
    console.error("Error creating new post: ", error);
    return {
      success: false,
      message: "Error creating new post",
    };
  }

  revalidatePath("/posts");

  return {
    success: true,
    message: "Post created successfully",
  };
}
