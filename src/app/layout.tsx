import { type Metadata } from "next";
import "~/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { GeistSans } from "geist/font/sans";

import { Providers } from "~/components/Providers";
import { TopNav } from "~/components/top-nav";
import { Toaster } from "~/components/ui/toaster";

export const metadata: Metadata = {
  title: "user-platform",
  description: "Personal project blueprint for user-centric applications.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${GeistSans.variable}`}
        suppressHydrationWarning
      >
        <head>
          {process.env.NODE_ENV === "development" && (
            <script
              src="https://unpkg.com/react-scan/dist/auto.global.js"
              async
            />
          )}
        </head>
        <body>
          <Providers>
            <TopNav />
            {children}
          </Providers>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
