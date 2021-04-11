import { FC } from "react";
import { PageHeader } from "./PageHeader";

export const PageLayout: FC<{}> = ({ children }) => {
  return (
    <main>
      <PageHeader />
      {children}
    </main>
  );
};
