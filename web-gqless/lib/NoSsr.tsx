import { ReactNode } from "react";
import dynamic from "next/dynamic";

export const NoSsr = dynamic<{ children: ReactNode }>(
  async () => (props) => <>{props.children}</>,
  { ssr: false },
);
