import { useState, useRef } from "react";

export const useTextSelection = () => {
  const [selection, setSelection] = useState<string>("");
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const textRef = useRef<HTMLDivElement>(null);

  const handleTextSelection = () => {
    const sel = getSelection()?.toString().trim() || "";
    if (!sel) {
      setSelection("");
      return;
    }

    const range = getSelection()!.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    if (textRef.current) {
      const parentRect = textRef.current.getBoundingClientRect();
      setCoords({
        x: rect.left - parentRect.left + rect.width / 2,
        y: rect.top - parentRect.top - 10,
      });
    }
    setSelection(sel);
  };

  const clearSelection = () => setSelection("");

  return { selection, coords, textRef, handleTextSelection, clearSelection };
};
