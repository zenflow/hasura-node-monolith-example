import { FC } from "react";

export const TimestampRef: FC<{ value: string }> = ({ value }) => {
  // expecting value to be ISO date format in UTC timezone
  const formatted = value.replace("T", " ").replace(/\..*/, " UTC");
  return <span>{formatted}</span>;
};
