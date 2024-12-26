"use server";

import { db } from "~/server/db";

export default async function getPosts() {
  const posts = await db.query.posts.findMany({
    orderBy: (model, { desc }) => desc(model.id),
    limit: 15,
  });

  await new Promise((resolve) => setTimeout(resolve, 3000));

  return posts;
}
