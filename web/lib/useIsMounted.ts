import { useState, useEffect } from "react";

export function useIsMounted() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  return isMounted;
}
