import { type Metadata } from "next";
import "~/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { GeistSans } from "geist/font/sans";
import { Toaster } from "~/components/ui/toaster";

import TanstackProvider from "~/components/TanstackProvider";
import { ThemeProvider } from "~/components/theme-provider";
import { TopNav } from "~/components/top-nav";

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
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TopNav />
            <TanstackProvider>{children}</TanstackProvider>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
