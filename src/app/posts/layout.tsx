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
  return <div className="p-2">{children}</div>;
}
