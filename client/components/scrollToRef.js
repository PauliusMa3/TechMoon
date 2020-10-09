import React, { useEffect, useLayoutEffect } from 'react';

const scrollToRef = (ref) => {
  useLayoutEffect(() => {
    console.log('window, ', window);
    if (typeof window !== 'undefined' && ref.current) {
      window.scroll({
        top: ref.current.offsetTop,
        behavior: 'smooth',
      });
    }
  });

  return null;
};

export default scrollToRef;
