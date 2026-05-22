"use client";
import { useEffect } from "react";

export default function ChunkErrorHandler() {
  useEffect(() => {
    const handler = (event) => {
      const error = event.error || event;
      const message = error?.message || "";

      const isChunkError =
        /Loading chunk [\d]+ failed/i.test(message) ||
        /ChunkLoadError/i.test(message) ||
        /Loading CSS chunk/i.test(message) ||
        (error?.name === "ChunkLoadError");

      if (isChunkError) {
        console.warn("Chunk load error detected, reloading...", message);

        // Prevent infinite reload loop using sessionStorage
        const reloadKey = "chunk_reload_attempted";
        if (!sessionStorage.getItem(reloadKey)) {
          sessionStorage.setItem(reloadKey, "1");
          window.location.reload();
        } else {
          // Already tried reloading, clear so next visit works
          sessionStorage.removeItem(reloadKey);
          console.error("Chunk reload failed twice, giving up.");
        }
      }
    };

    // Also catch unhandled promise rejections (dynamic imports fail this way)
    const rejectionHandler = (event) => {
      const reason = event.reason;
      const message = reason?.message || "";

      const isChunkError =
        /Loading chunk [\d]+ failed/i.test(message) ||
        /ChunkLoadError/i.test(message) ||
        reason?.name === "ChunkLoadError";

      if (isChunkError) {
        console.warn("Chunk load rejection detected, reloading...", message);
        const reloadKey = "chunk_reload_attempted";
        if (!sessionStorage.getItem(reloadKey)) {
          sessionStorage.setItem(reloadKey, "1");
          window.location.reload();
        } else {
          sessionStorage.removeItem(reloadKey);
        }
      }
    };

    window.addEventListener("error", handler);
    window.addEventListener("unhandledrejection", rejectionHandler);

    return () => {
      window.removeEventListener("error", handler);
      window.removeEventListener("unhandledrejection", rejectionHandler);
    };
  }, []);

  return null;
}