import { useRef, useCallback } from 'react';

export const useDebounce = <Args extends unknown[]>(
    fn: (...args: Args) => void,
    delay = 300
) => {
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    return useCallback(
        (...args: Args) => {
            if (timer.current) clearTimeout(timer.current);
            timer.current = setTimeout(() => fn(...args), delay);
        },
        [fn, delay]
    );
};