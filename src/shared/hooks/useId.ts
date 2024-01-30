import { useState } from "react";
import { useIsomorphicEffect } from "./useIsomorphicEffect";
import { randomId } from "@/helpers/randomId";
import { useReactId } from "./useReactId";

export function useId(staticId?: string) {
  const reactId = useReactId();
  const [uuid, setUuid] = useState(reactId);

  useIsomorphicEffect(() => {
    setUuid(randomId());
  }, []);

  if (typeof staticId === "string") {
    return staticId;
  }

  if (typeof window === "undefined") {
    return reactId;
  }

  return uuid;
}
