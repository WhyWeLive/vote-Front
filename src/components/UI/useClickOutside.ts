import { useEffect } from "react";
export const useClickOutside = (
  ref: React.MutableRefObject<any>,
  callback: () => void,
) => {
  const handleClick = (e: Event) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });
};
