import { useEffect, useState } from "react";

export function useDebouce(value: string, delay: number = 500): string {
  const [debounced, setDebounced] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}
