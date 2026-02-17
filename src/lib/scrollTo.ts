"use client";

import { useEffect } from "react";

interface ScrollToProps {
  targetId: string;
}

export default function ScrollTo({ targetId }: ScrollToProps) {
  useEffect(() => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [targetId]);

  return null; 
}
