// components/SessionDebug.tsx
'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export default function SessionDebug() {
    const { data: session, status } = useSession()
    const [manualSession, setManualSession] = useState<any>(null)
    const [cookies, setCookies] = useState('')

    useEffect(() => {
        const checkSession = async () => {
            try {
                console.log('=== TENTATIVE FETCH SESSION ===')
                const response = await fetch('/api/auth/session')
                console.log('Response status:', response.status)
                console.log('Response headers:', response.headers)

                const data = await response.json()
                console.log('=== SESSION MANUELLE ===', data)
                setManualSession(data)
            } catch (error) {
                console.error('Erreur fetch session:', error)
            }
        }

        // Récupérer les cookies
        setCookies(document.cookie)

        checkSession()
    }, [])

    useEffect(() => {
        console.log('=== USEEFFECT SESSION CHANGE ===')
        console.log('Status:', status)
        console.log('Session useSession:', session)
    }, [session, status])

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            background: 'black',
            color: 'white',
            padding: '10px',
            zIndex: 9999,
            fontSize: '12px',
            maxWidth: '300px',
            overflow: 'auto',
            maxHeight: '200px'
        }}>
            <div><strong>useSession Status:</strong> {status}</div>
            <div><strong>useSession Data:</strong> {session ? 'OUI' : 'NON'}</div>
            <div><strong>User Email:</strong> {session?.user?.email || 'N/A'}</div>
            <div><strong>User Role:</strong> {session?.user?.role || 'N/A'}</div>
            <hr />
            <div><strong>Fetch Manual:</strong> {manualSession ? 'OUI' : 'NON'}</div>
            <div><strong>Manual User:</strong> {(manualSession as any)?.user?.email || 'N/A'}</div>
            <hr />
            <div><strong>Cookies:</strong> {cookies.includes('next-auth') ? 'OUI' : 'NON'}</div>
        </div>
    )
}