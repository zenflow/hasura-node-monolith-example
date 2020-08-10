import { FC } from "react";
import { useIsMounted } from "../lib/useIsMounted";

export const TimestampReference: FC<{ value: string }> = ({ value }) => {
  const isMounted = useIsMounted();
  const date = new Date(value);
  // On client, use client's timezone and format
  // On server, use universal timezone and format
  const text = isMounted ? date.toLocaleString() : date.toUTCString();
  return <span>{text}</span>;
};
