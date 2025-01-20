import { type ReactNode } from "react";
import { ConvexClientProvider } from "~/app/ConvexClientProvider";
import TanstackProvider from "~/components/TanstackProvider";
import { ThemeProvider } from "~/components/theme-provider";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ConvexClientProvider>
        <TanstackProvider>{children}</TanstackProvider>
      </ConvexClientProvider>
    </ThemeProvider>
  );
}
