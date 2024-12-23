"use server";

import { auth } from "@clerk/nextjs/server";
import { ActionResponse } from "~/actions/types/ActionResponse";
import { db } from "~/server/db";
import { NewPost, posts, postsInsertSchema } from "~/server/db/schema";

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

  return {
    success: true,
    message: "Post created successfully",
  };
}
