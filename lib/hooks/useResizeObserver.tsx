import { useRef, useState, useLayoutEffect } from 'react';

// Define a type for the size state
type Size = { width: number | undefined; height: number | undefined };

function useResizeObserver(): [React.RefObject<HTMLDivElement>, Size] {
  const ref = useRef<HTMLDivElement>(null);
  const [ size, setSize ] = useState<Size>({ width: undefined, height: undefined });

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    resizeObserver.observe(element);

    // Cleanup function
    return () => {
      if (element) {
        resizeObserver.unobserve(element);
      }
    };
  }, []);

  return [ ref, size ];
}

export default useResizeObserver;
