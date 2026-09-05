import { useEffect } from "react";
import { useRef } from "react";


export function usePrev(value){
    
    const ref = useRef(); //value

    useEffect(() => {
        ref.current = value;
    }, [value])

    return ref.current;
} //There is a property of react that it returns first and Effects runs letter