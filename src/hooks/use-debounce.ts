import { useCallback, useEffect, useRef } from "react";

type DebouncedFn<T extends unknown[]> = (...args: T) => Promise<void> | void;

export function useDebounce<T extends unknown[]>(
  fn: DebouncedFn<T>,
  delay: number,
): DebouncedFn<T> {
  const timeoutRef = useRef<null | number>(null);

  const debouncedFn = useCallback(
    (...args: T) => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }

      return new Promise<void>((resolve, reject) => {
        timeoutRef.current = window.setTimeout(() => {
          try {
            const result = fn(...args);

            if (result instanceof Promise) {
              result.then(resolve).catch(reject);
            } else {
              resolve(result);
            }
          } catch (error) {
            // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
            reject(error);
          }

          timeoutRef.current = null;
        }, delay);
      });
    },
    [fn, delay],
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedFn;
}