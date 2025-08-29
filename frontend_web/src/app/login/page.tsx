'use client';

import LoginForm from "@/app/components/forms/LoginForm";
import {Suspense} from "react";
import fonts from "@/utils/fonts";
import ButtonLink from "@/app/components/ui/ButtonLink";
import { usePWA } from "../PWAContext";


export default function Login() {
    const isPWA = usePWA();

    return (
        <main className={`px-4 ${isPWA ? "py-10" : "pt-17 pb-10"} min-h-screen max-w-100 mx-auto flex justify-center flex-col items-center`}>
            <h1 className="text-center text-2xl">Connexion</h1>
            <Suspense>
                <LoginForm/>
            </Suspense>
            <div className="divider divider-vertical divider-primary">OU</div>
            <div className={`${fonts.openSans.className} w-full`}>
                <p className="text-center text-sm">Tu n'as pas encore de compte&nbsp;? <br/>
                    alors inscrit toi et créer tes premières capsules&nbsp;!
                </p>
                <ButtonLink href="/register" text="S'inscrire" />
            </div>
        </main>
    )
}