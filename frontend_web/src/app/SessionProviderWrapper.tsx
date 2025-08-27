'use client';

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

interface SessionProviderWrapperProps {
    children: ReactNode;
    session?: Session | null;
}

export default function SessionProviderWrapper({ children, session }: SessionProviderWrapperProps) {


    return (
        <SessionProvider session={session} refetchInterval={60 * 60} refetchOnWindowFocus={true} refetchWhenOffline={false}>
            {children}
        </SessionProvider>
    );
}