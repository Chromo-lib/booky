import { useEffect } from "react";

export default function useClickAway (ref) {

  useEffect(() => {
    const handleClick = e => {
      ref.current.style.display = ref.current && ref.current.contains(e.target) ? 'block' : 'none';
      return;
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref]);
}