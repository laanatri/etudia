'use client';

import {Suspense} from "react";
import RegisterForm from "@/app/components/forms/RegisterForm";
import fonts from "@/utils/fonts";
import ButtonLink from "@/app/components/ui/ButtonLink";

export default function Register() {

    return (
        <main className={`px-4 py-10 min-h-screen max-w-100 mx-auto flex justify-center flex-col items-center`}>
            <h1 className="text-center text-2xl">Inscription</h1>
            <Suspense>
                <RegisterForm/>
            </Suspense>
            <div className="divider divider-vertical divider-primary">OU</div>
            <div className={`${fonts.openSans.className} w-full`}>
                <p className="text-center text-sm">Tu as déjà un compte&nbsp;? <br/>
                    Connecte toi pour continuer d'apprendre&nbsp;!
                </p>
                <ButtonLink href="/login" text="Se connecter" />
            </div>
        </main>
    )
}