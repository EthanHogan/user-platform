import "~/styles/globals.css";

import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Posts",
  description: "Posts page",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function PostsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="border border-red-500 p-1">
      <h1 className="text-2xl">Posts Layout</h1>
      <div>{children}</div>
    </div>
  );
}
