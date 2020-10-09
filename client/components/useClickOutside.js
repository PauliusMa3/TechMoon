import { useEffect, useRef } from "react";

const useClickOutside = (close) => {
  const dropdownRef = useRef(null);
  const handleClick = e => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      close();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });

  // return dropdownRef;
};

export default useClickOutside;
