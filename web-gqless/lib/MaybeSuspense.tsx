import { Suspense as ReactSuspense, SuspenseProps } from "react";

export const MaybeSuspense =
  typeof window !== "undefined" ? ReactSuspense : ({ children }: SuspenseProps) => <>{children}</>;
