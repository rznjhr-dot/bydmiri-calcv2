// ThemeProvider — no-op; dark-only theme is applied via CSS variables in globals.css
import type { ReactNode } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
