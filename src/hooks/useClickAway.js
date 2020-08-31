import { useEffect } from "react";

export default function useClickAway (ref, setShow) {

  useEffect(() => {
    const handleClick = e => {
      if (setShow) {
        setShow(ref.current.contains(e.target));
      }
      else {
        ref.current.style.display = ref.current.contains(e.target) ? 'block' : 'none';
      }
      return;
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref]);
}