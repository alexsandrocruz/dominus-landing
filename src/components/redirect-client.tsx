"use client";

import { useEffect } from "react";

type RedirectClientProps = {
  target: string;
};

export function RedirectClient({ target }: RedirectClientProps): null {
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.location.replace(target);
  }, [target]);

  return null;
}
