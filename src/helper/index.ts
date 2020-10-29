import { useLayoutEffect, useState } from 'react';

export const useWindowSize: () => number = () => {
  const [width, setWidth] = useState<number>(0);

  useLayoutEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return width;
};
