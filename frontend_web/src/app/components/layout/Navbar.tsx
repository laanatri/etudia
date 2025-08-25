'use client'

import { usePWA } from "@/app/PWAContext";
import {Home, LogIn, LogOut, User} from "lucide-react";
import {useSession, signOut} from "next-auth/react";
import Link from "next/link";
import {useEffect, useState} from "react";

export default function Navbar() {

    const {data: session, status, update} = useSession();
    const [mounted, setMounted] = useState(false);

    const isAuthenticated = status === 'authenticated';
    const isPWA = usePWA();

    useEffect(() => {
        setMounted(true);
    }, []);

    console.log("YOYOYOYOYOOYOY")
    console.log(session)
    console.log(status)
    console.log(isAuthenticated)
    console.log(isPWA)

    if (!mounted || status === 'loading') {
        return (
            <div className="navbar bg-base-100 shadow-sm p-2">
                <div className="flex-1">
                    <Link href={"/"} className="btn btn-ghost text-xl">Etud IA</Link>
                </div>
                <div className="flex-none gap-4">
                    <div className="flex items-center gap-2">
                        <Link
                            href="/login"
                            className="btn btn-ghost btn-sm flex items-center gap-2"
                        >
                            <LogIn size={16}/>
                            Connexion
                        </Link>
                        <span className="text-gray-400">|</span>
                        <Link
                            href="/register"
                            className="btn btn-outline btn-sm flex items-center gap-2"
                        >
                            <User size={16}/>
                            Inscription
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <nav className="navbar bg-base-100 shadow-sm p-2 fixed top-0 z-20">
            <div className="flex-1">
                <Link href={"/"} className="btn btn-ghost text-xl">Etud IA</Link>
            </div>

            <div className="flex-none gap-4">

                {!isAuthenticated ? (
                    <div className="flex items-center gap-2">
                        <Link
                            href="/login"
                            className="btn btn-ghost rounded-xl btn-sm flex items-center gap-2"
                        >
                            <LogIn size={16}/>
                            Connexion
                        </Link>
                        <span className="text-gray-400">|</span>
                        <Link
                            href="/register"
                            className="btn btn-primary rounded-xl btn-sm flex items-center gap-2"
                        >
                            <User size={16}/>
                            Inscription
                        </Link>
                    </div>
                ) : null}

                {isAuthenticated ? (
                    <>
                        {session?.user?.role === 'ROLE_ADMIN' && (
                            <Link href="/dashboard/admin" className="hover:text-gray-400">
                                Dashboard
                            </Link>
                        )}
                        {session?.user?.role === 'ROLE_ETUDIANT' && (
                            <Link href="/dashboard/etudiant/compte" className="flex items-center gap-2 hover:bg-base-200 p-2 rounded-lg transition-colors" >
                                <div className="w-8 h-8 rounded-full overflow-hidden">
                                    <img
                                        alt="Photo de profil"
                                        src={"https://rugby.vlaanderen/wp-content/uploads/2018/03/Anonymous-Profile-pic.jpg"}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                {!isPWA && <span className="text-sm font-medium">{session?.user?.username}</span>}
                            </Link>
                        )}
                    </>
                ) : null}

            </div>
        </nav>
    )
}