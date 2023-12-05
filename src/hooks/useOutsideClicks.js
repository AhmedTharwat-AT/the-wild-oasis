import { useEffect, useRef } from "react";

export default function useOutsideClicks(handle) {
  const ref = useRef();

  useEffect(() => {
    function handleClose(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        console.log("click outside");
        handle();
      }
    }
    document.addEventListener("click", handleClose, true);
    return () => document.removeEventListener("click", handleClose, true);
  }, [handle]);

  return ref;
}
