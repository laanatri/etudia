'use client'

import {useSession, signOut} from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {

    const { data: session, status, update } = useSession();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    const isAuthenticated = status === 'authenticated';

    console.log("////////////////////////////////////////////////")
    console.log("Navbar - Session status:", status);
    console.log("Navbar - Session data:", session);
    console.log("Navbar - User role:", session?.user?.role);

    console.log(isAuthenticated);

        useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            update();
        }, 30000);

        return () => clearInterval(interval);
    }, [update]);

    if (!mounted || status === 'loading') {
        return (
            <div className="navbar bg-base-100 shadow-sm p-2">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">Etud IA</a>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="navbar bg-base-100 shadow-sm p-2">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">Etud IA</a>
                </div>

                <div className="flex-none">

                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img alt="image profil" src="https://rugby.vlaanderen/wp-content/uploads/2018/03/Anonymous-Profile-pic.jpg" />
                            </div>
                        </div>
                        <div tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">

                            <Link href="/" className="hover:text-gray-300">
                                Accueil
                            </Link>
                            {status !== 'authenticated' ? (
                                <Link href="/login" className="hover:text-gray-300">
                                    Connexion
                                </Link>
                            ) : null}

                            {isAuthenticated ? (
                                <>
                                    <hr className="my-5"/>

                                    {session?.user?.role === 'ROLE_ADMIN' && (
                                        <Link href="/dashboard/admin" className="hover:text-gray-300">
                                            Dashboard
                                        </Link>
                                    )}
                                    {session?.user?.role === 'ROLE_ETUDIANT' && (
                                        <Link href="/dashboard/adopter" className="hover:text-gray-300">
                                            Mon compte
                                        </Link>
                                    )}

                                    <button onClick={() => signOut({ callbackUrl: '/login' })} className="text-left cursor-pointer">
                                        Déconnexion
                                    </button>

                                </>
                            ) : null}
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}