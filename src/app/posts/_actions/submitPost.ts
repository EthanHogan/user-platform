"use server";

import { ActionResponse } from "~/actions/types/ActionResponse";
import { db } from "~/server/db";
import { NewPost, posts, postsInsertSchema } from "~/server/db/schema";

export default async function submitPost(
  newPost: NewPost,
): Promise<ActionResponse> {
  console.log("NewPost submitted: ", newPost);

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
