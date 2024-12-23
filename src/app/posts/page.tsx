import { Suspense } from "react";
import { db } from "~/server/db";

export default function PostsPage() {
  return (
    <div className="border border-green-500 p-1">
      <h2 className="text-xl">Posts Page</h2>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <Suspense
            fallback={
              <tr>
                <td>Loading...</td>
              </tr>
            }
          >
            <Posts />
          </Suspense>
        </tbody>
      </table>
    </div>
  );
}

const Posts = async () => {
  const posts = await db.query.posts.findMany();

  // wait 3 seconds
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return (
    <>
      {posts.map((post) => (
        <tr key={post.id}>
          <td>{post.id}</td>
          <td>{post.name}</td>
        </tr>
      ))}
    </>
  );
};
