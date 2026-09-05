// import { useRef } from "react";

// export function useDebounce(originalFn){
//     const clockInterval = useRef();

//     const fn = () => {
//         clearInterval(clockInterval.current);
//         clockInterval.current= setTimeout(originalFn, 200);
//     }

//     return fn;
// }   /


import { useState, useEffect } from 'react';

export const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);// when value and delay changes clearTimeout runs first
        };
    }, [value, delay]);

    return debouncedValue;
};

export default useDebounce;
