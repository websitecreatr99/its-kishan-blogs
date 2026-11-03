"use client";
import { createContext, useContext, useState } from "react";

const SegmentStateContext = createContext(null);

export function SegmentStateProvider({ children }) {
  const [segmentState, setSegmentState] = useState(null);

  return (
    <SegmentStateContext.Provider value={{ segmentState, setSegmentState }}>
      {children}
    </SegmentStateContext.Provider>
  );
}

// Custom hook for convenience
export function useSegmentState() {
  const ctx = useContext(SegmentStateContext);
  if (!ctx) {
    throw new Error("useSegmentState must be used inside SegmentStateProvider");
  }
  return ctx;
}
