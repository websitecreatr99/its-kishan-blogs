"use client";
import { useEffect } from "react";

export default function ChunkErrorHandler() {
  useEffect(() => {
    const handler = (e) => {
      if (/Loading chunk [\d]+ failed/.test(e.message)) {
        console.warn("Chunk load failed, reloading page...");
        window.location.reload();
      }
    };
    window.addEventListener("error", handler);

    return () => window.removeEventListener("error", handler);
  }, []);

  return null; // nothing rendered
}
