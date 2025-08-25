"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";


const PWAContext = createContext(false);

export function PWAProvider({children}: {children: ReactNode}) {
    const [isPWA, setIsPWA] = useState(false);

    useEffect(() => {
        const checkPWA = () => {
            const standalone = window.matchMedia('(display-mode: standalone)').matches;
            const iosStandalone = (window.navigator as any).standalone === true;
    
            setIsPWA(standalone || iosStandalone);
        }

        checkPWA();

        const mqList = window.matchMedia('(display-mode: standalone)');
        mqList.addEventListener("change", checkPWA);

        return () => {
            mqList.addEventListener("change", checkPWA);
        }

    }, []);

    return (
        <PWAContext.Provider value={isPWA}>
            {children}
        </PWAContext.Provider>
    )

}

export function usePWA() {
    return useContext(PWAContext);
}