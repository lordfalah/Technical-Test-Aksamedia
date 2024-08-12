import { useEffect, useRef, MutableRefObject } from "react";

function useOuterClick<T extends Element>(
  callback: (event: MouseEvent) => void,
): MutableRefObject<T | null> {
  const callbackRef = useRef<(event: MouseEvent) => void>(); // initialize mutable ref, which stores callback
  const innerRef = useRef<T | null>(null); // returned to client, who marks "border" element

  // update callback on each render, so second useEffect has access to current value
  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        innerRef.current &&
        callbackRef.current &&
        !innerRef.current.contains(e.target as Node)
      ) {
        callbackRef.current(e);
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []); // no dependencies -> stable click listener

  return innerRef; // convenience for client (doesn't need to init ref himself)
}

export default useOuterClick;
